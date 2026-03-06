from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PatientViewSet, ObservationViewSet

router = DefaultRouter()
router.register(r'patients', PatientViewSet)
router.register(r'observations', ObservationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
from rest_framework.routers import DefaultRouter
from .views import (PatientViewSet, ObservationViewSet, PractitionerViewSet, EncounterViewSet,
                    ConditionViewSet, ProcedureViewSet, MedicationViewSet, MedicationRequestViewSet,
                    AllergyIntoleranceViewSet, ImmunizationViewSet, CarePlanViewSet, DiagnosticReportViewSet)

router = DefaultRouter()
router.register(r'patients', PatientViewSet)
router.register(r'observations', ObservationViewSet)
router.register(r'practitioners', PractitionerViewSet)
router.register(r'encounters', EncounterViewSet)
router.register(r'conditions', ConditionViewSet)
router.register(r'procedures', ProcedureViewSet)
router.register(r'medications', MedicationViewSet)
router.register(r'medication-requests', MedicationRequestViewSet)
router.register(r'allergies', AllergyIntoleranceViewSet)
router.register(r'immunizations', ImmunizationViewSet)
router.register(r'careplans', CarePlanViewSet)
router.register(r'diagnostic-reports', DiagnosticReportViewSet)

urlpatterns = router.urls