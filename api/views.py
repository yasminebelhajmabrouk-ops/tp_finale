from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Patient, Observation
from .serializers import PatientSerializer, ObservationSerializer

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['gender', 'birth_date']
    search_fields = ['first_name', 'last_name']
    ordering_fields = ['birth_date', 'last_name']

class ObservationViewSet(viewsets.ModelViewSet):
    queryset = Observation.objects.all()
    serializer_class = ObservationSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['code', 'date', 'patient']
    search_fields = ['code', 'unit']
    ordering_fields = ['date', 'value']

from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import (Patient, Observation, Practitioner, Encounter, Condition, Procedure, 
                     Medication, MedicationRequest, AllergyIntolerance, Immunization, CarePlan, DiagnosticReport)
from .serializers import (PatientSerializer, ObservationSerializer, PractitionerSerializer, EncounterSerializer,
                          ConditionSerializer, ProcedureSerializer, MedicationSerializer, MedicationRequestSerializer,
                          AllergyIntoleranceSerializer, ImmunizationSerializer, CarePlanSerializer, DiagnosticReportSerializer)

class PractitionerViewSet(viewsets.ModelViewSet):
    queryset = Practitioner.objects.all().order_by('id')
    serializer_class = PractitionerSerializer

class EncounterViewSet(viewsets.ModelViewSet):
    queryset = Encounter.objects.all().order_by('id')
    serializer_class = EncounterSerializer

class ConditionViewSet(viewsets.ModelViewSet):
    queryset = Condition.objects.all().order_by('id')
    serializer_class = ConditionSerializer

class ProcedureViewSet(viewsets.ModelViewSet):
    queryset = Procedure.objects.all().order_by('id')
    serializer_class = ProcedureSerializer

class MedicationViewSet(viewsets.ModelViewSet):
    queryset = Medication.objects.all().order_by('id')
    serializer_class = MedicationSerializer

class MedicationRequestViewSet(viewsets.ModelViewSet):
    queryset = MedicationRequest.objects.all().order_by('id')
    serializer_class = MedicationRequestSerializer

class AllergyIntoleranceViewSet(viewsets.ModelViewSet):
    queryset = AllergyIntolerance.objects.all().order_by('id')
    serializer_class = AllergyIntoleranceSerializer

class ImmunizationViewSet(viewsets.ModelViewSet):
    queryset = Immunization.objects.all().order_by('id')
    serializer_class = ImmunizationSerializer

class CarePlanViewSet(viewsets.ModelViewSet):
    queryset = CarePlan.objects.all().order_by('id')
    serializer_class = CarePlanSerializer

class DiagnosticReportViewSet(viewsets.ModelViewSet):
    queryset = DiagnosticReport.objects.all().order_by('id')
    serializer_class = DiagnosticReportSerializer