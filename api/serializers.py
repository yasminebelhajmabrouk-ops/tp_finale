from rest_framework import serializers
from .models import Patient, Observation

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class ObservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Observation
        fields = '__all__'


from .models import (Patient, Observation, Practitioner, Encounter, Condition, Procedure, 
                     Medication, MedicationRequest, AllergyIntolerance, Immunization, CarePlan, DiagnosticReport)
from rest_framework import serializers

class PractitionerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Practitioner
        fields = '__all__'

class EncounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Encounter
        fields = '__all__'

class ConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Condition
        fields = '__all__'

class ProcedureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Procedure
        fields = '__all__'

class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = '__all__'

class MedicationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicationRequest
        fields = '__all__'

class AllergyIntoleranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllergyIntolerance
        fields = '__all__'

class ImmunizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Immunization
        fields = '__all__'

class CarePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarePlan
        fields = '__all__'

class DiagnosticReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiagnosticReport
        fields = '__all__'