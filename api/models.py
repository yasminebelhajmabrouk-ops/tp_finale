from django.db import models

class Patient(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birth_date = models.DateField()
    gender = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Observation(models.Model):
    patient = models.ForeignKey(Patient, related_name='observations', on_delete=models.CASCADE)
    code = models.CharField(max_length=50)
    value = models.CharField(max_length=100)
    unit = models.CharField(max_length=20, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.code} - {self.value}"
class Practitioner(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Encounter(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    practitioner = models.ForeignKey(Practitioner, on_delete=models.SET_NULL, null=True)
    date = models.DateTimeField(auto_now_add=True)
    reason = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"Encounter {self.id} - {self.patient}"

class Condition(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    code = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.code} - {self.patient}"

class Procedure(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    code = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.code} - {self.patient}"

class Medication(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name

class MedicationRequest(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    medication = models.ForeignKey(Medication, on_delete=models.CASCADE)
    dosage = models.CharField(max_length=100, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.medication} - {self.patient}"

class AllergyIntolerance(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    substance = models.CharField(max_length=100)
    reaction = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.substance} - {self.patient}"

class Immunization(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    vaccine = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.vaccine} - {self.patient}"

class CarePlan(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"CarePlan {self.id} - {self.patient}"

class DiagnosticReport(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    report_type = models.CharField(max_length=100)
    result = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.report_type} - {self.patient}"