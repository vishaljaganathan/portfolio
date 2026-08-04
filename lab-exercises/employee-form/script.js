document.addEventListener('DOMContentLoaded', () => {
    const employeeForm = document.getElementById('employeeForm');
    const successMessage = document.getElementById('successMessage');
    const addAnotherBtn = document.getElementById('addAnotherBtn');

    if (employeeForm) {
        employeeForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent page reload
            
            // Here you could collect the form data if needed
            // const formData = new FormData(this);
            // const data = Object.fromEntries(formData.entries());
            // console.log('Employee Data:', data);

            // Show success message
            successMessage.classList.remove('hidden');
            
            // Optionally, we could send data to a backend here via fetch()
        });
    }

    if (addAnotherBtn) {
        addAnotherBtn.addEventListener('click', function() {
            // Reset the form
            employeeForm.reset();
            
            // Hide the success message
            successMessage.classList.add('hidden');
        });
    }
});
