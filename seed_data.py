import os
import django
import random
from datetime import datetime, timedelta

# Configuration de l'environnement Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fhir_api.settings')
django.setup()

from api.models import (
    Patient, Practitioner, Observation, Encounter, 
    Condition, Medication, MedicationRequest, AllergyIntolerance
)

def seed_data():
    print("Debut du peuplement de la base de donnees...")

    # 1. Création de Praticiens
    doctors = [
        {"first_name": "Alice", "last_name": "Bernard", "gender": "female"},
        {"first_name": "Marc", "last_name": "Leroy", "gender": "male"},
    ]
    db_doctors = []
    for doc in doctors:
        d, _ = Practitioner.objects.get_or_create(**doc)
        db_doctors.append(d)
    print(f"Praticiens crees: {len(db_doctors)}")

    # 2. Création de Médicaments
    meds = [
        {"name": "Paracetamol 500mg", "code": "PARA-500"},
        {"name": "Amoxicilline 1g", "code": "AMOX-1"},
        {"name": "Ibuprofene 400mg", "code": "IBU-400"},
        {"name": "Metformine 850mg", "code": "MET-850"},
    ]
    db_meds = []
    for med in meds:
        m, _ = Medication.objects.get_or_create(**med)
        db_meds.append(m)
    print(f"Medicaments crees: {len(db_meds)}")

    # 3. Création de Patients et leurs ressources
    patients_data = [
        {"first_name": "Jean", "last_name": "Dupont", "gender": "male", "birth_date": "1985-05-12"},
        {"first_name": "Marie", "last_name": "Curie", "gender": "female", "birth_date": "1992-11-23"},
        {"first_name": "Thomas", "last_name": "Pesquet", "gender": "male", "birth_date": "1978-02-27"},
        {"first_name": "Sophie", "last_name": "Martin", "gender": "female", "birth_date": "2000-08-15"},
        {"first_name": "Lucas", "last_name": "Dubois", "gender": "male", "birth_date": "1965-03-30"},
        {"first_name": "Emma", "last_name": "Petit", "gender": "female", "birth_date": "1995-12-01"},
    ]

    for p_data in patients_data:
        p, created = Patient.objects.get_or_create(**p_data)
        if not created:
            continue

        # Ajouter un Encounter (Consultation)
        enc = Encounter.objects.create(
            patient=p,
            practitioner=random.choice(db_doctors),
            reason="Examen de routine"
        )

        # Ajouter des Observations
        Observation.objects.create(
            patient=p,
            code="Tension Arterielle",
            value=str(random.randint(110, 140)),
            unit="mmHg"
        )
        Observation.objects.create(
            patient=p,
            code="Frequence Cardiaque",
            value=str(random.randint(60, 95)),
            unit="bpm"
        )

        # Ajouter une Condition (Diagnostic)
        Condition.objects.create(
            patient=p,
            code=random.choice(["Hypertension", "Diabete Type 2", "Asthme", "RHUM-01"]),
            description="Diagnostic etabli suite a l'examen."
        )

        # Ajouter une Allergy (si chance)
        if random.random() > 0.5:
            AllergyIntolerance.objects.create(
                patient=p,
                substance="Penicilline",
                reaction="Eruption cutanee"
            )

        # Ajouter une Prescription
        MedicationRequest.objects.create(
            patient=p,
            medication=random.choice(db_meds),
            dosage="1 comprime matin et soir"
        )

    print("Peuplement termine avec succes !")

if __name__ == "__main__":
    seed_data()
