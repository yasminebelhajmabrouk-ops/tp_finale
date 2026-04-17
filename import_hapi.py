import os
import django
import requests
import random
from datetime import datetime

# Configuration Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fhir_api.settings')
django.setup()

from api.models import Patient, Observation, Practitioner, Encounter

HAPI_BASE_URL = "https://hapi.fhir.org/baseR4"

def get_fhir_name(name_list):
    if not name_list:
        return "Unknown", "Unknown"
    name = name_list[0]
    given = name.get('given', ['Unknown'])[0]
    family = name.get('family', 'Unknown')
    return given, family

def import_data(count=20):
    print(f"Démarrage de l'importation depuis {HAPI_BASE_URL}...")
    
    # 1. Récupérer des Patients
    try:
        response = requests.get(f"{HAPI_BASE_URL}/Patient?_count={count}&_format=json")
        response.raise_for_status()
        bundle = response.json()
    except Exception as e:
        print(f"Erreur lors de la récupération des patients: {e}")
        return

    patient_mapping = {} # HAPI ID -> Local Instance

    entries = bundle.get('entry', [])
    print(f"Trouvé {len(entries)} patients potentiels.")

    for entry in entries:
        resource = entry.get('resource')
        hapi_id = resource.get('id')
        
        given, family = get_fhir_name(resource.get('name'))
        gender = resource.get('gender', 'unknown')
        birth_date = resource.get('birthDate', '1900-01-01')
        
        # S'assurer que la date est au bon format (YYYY-MM-DD)
        if len(birth_date) > 10:
            birth_date = birth_date[:10]

        try:
            p, created = Patient.objects.get_or_create(
                first_name=given,
                last_name=family,
                birth_date=birth_date,
                gender=gender
            )
            patient_mapping[hapi_id] = p
            if created:
                print(f"Patient créé: {given} {family}")
        except Exception as e:
            print(f"Erreur lors de la création du patient {hapi_id}: {e}")

    # 2. Récupérer des Observations pour ces patients
    print("\nRécupération des observations...")
    for hapi_id, local_p in patient_mapping.items():
        try:
            obs_res = requests.get(f"{HAPI_BASE_URL}/Observation?patient={hapi_id}&_count=5&_format=json")
            obs_res.raise_for_status()
            obs_bundle = obs_res.json()
            
            obs_entries = obs_bundle.get('entry', [])
            for o_entry in obs_entries:
                o_res = o_entry.get('resource')
                
                # Extraire le code
                code_text = "Observation"
                if 'code' in o_res:
                    code_text = o_res['code'].get('text') or o_res['code'].get('coding', [{}])[0].get('display', 'Observation')
                
                # Extraire la valeur
                value = "N/A"
                unit = ""
                if 'valueQuantity' in o_res:
                    value = str(o_res['valueQuantity'].get('value', 'N/A'))
                    unit = o_res['valueQuantity'].get('unit', '')
                elif 'valueString' in o_res:
                    value = o_res['valueString']
                
                Observation.objects.get_or_create(
                    patient=local_p,
                    code=code_text[:50], # Limite du modèle
                    value=str(value)[:100],
                    unit=unit[:20]
                )
            if obs_entries:
                print(f"Importé {len(obs_entries)} observations pour {local_p}")
        except Exception as e:
            print(f"Erreur observations pour patient {hapi_id}: {e}")

    print("\nImportation terminee !")

if __name__ == "__main__":
    import_data()
