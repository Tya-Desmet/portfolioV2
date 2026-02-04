/**
 * ===================================================================
 * CONTACT FORM - VALIDATION FRONTEND
 * Story 3.2: Formulaire de contact avec validation JavaScript
 * ===================================================================
 */

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Récupération des éléments du formulaire
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');

    // Récupération des spans d'erreur
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

    // Regex pour validation email (RFC 5322 simplifié mais plus robuste)
    // Accepte: user@domain.com, user.name@domain.co.uk, etc.
    // Rejette: user@domain, user@, @domain.com
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    // Configuration des validations
    const validations = {
        name: {
            input: nameInput,
            error: nameError,
            validate: (value) => {
                if (!value.trim()) {
                    return 'Le nom est requis';
                }
                if (value.trim().length < 2) {
                    return 'Le nom doit contenir au moins 2 caractères';
                }
                return '';
            }
        },
        email: {
            input: emailInput,
            error: emailError,
            validate: (value) => {
                if (!value.trim()) {
                    return 'L\'email est requis';
                }
                if (!emailRegex.test(value.trim())) {
                    return 'Veuillez entrer une adresse email valide';
                }
                return '';
            }
        },
        subject: {
            input: subjectInput,
            error: subjectError,
            validate: (value) => {
                if (!value.trim()) {
                    return 'Le sujet est requis';
                }
                if (value.trim().length < 3) {
                    return 'Le sujet doit contenir au moins 3 caractères';
                }
                return '';
            }
        },
        message: {
            input: messageInput,
            error: messageError,
            validate: (value) => {
                if (!value.trim()) {
                    return 'Le message est requis';
                }
                if (value.trim().length < 10) {
                    return `Le message doit contenir au moins 10 caractères (${value.trim().length}/10)`;
                }
                return '';
            }
        }
    };

    /**
     * Valide un champ spécifique et affiche/masque le message d'erreur
     * @param {string} fieldName - Nom du champ à valider
     * @returns {boolean} - True si le champ est valide, false sinon
     */
    function validateField(fieldName) {
        const field = validations[fieldName];
        const value = field.input.value;
        const errorMessage = field.validate(value);

        // Afficher ou masquer l'erreur
        if (errorMessage) {
            field.error.textContent = errorMessage;
            field.error.classList.add('visible');
            field.input.classList.add('invalid');
            field.input.classList.remove('valid');
            // Annoncer l'erreur aux lecteurs d'écran
            field.input.setAttribute('aria-invalid', 'true');
            return false;
        } else {
            field.error.textContent = '';
            field.error.classList.remove('visible');
            field.input.classList.remove('invalid');
            field.input.classList.add('valid');
            field.input.setAttribute('aria-invalid', 'false');
            return true;
        }
    }

    /**
     * Valide tous les champs du formulaire
     * @returns {boolean} - True si tous les champs sont valides
     */
    function validateAllFields() {
        let isValid = true;
        Object.keys(validations).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isValid = false;
            }
        });
        return isValid;
    }

    /**
     * Met à jour l'état du bouton submit selon la validité du formulaire
     */
    function updateSubmitButton() {
        const isFormValid = validateAllFields();
        submitBtn.disabled = !isFormValid;
    }

    /**
     * Réinitialise le formulaire à son état initial
     */
    function resetForm() {
        form.reset();
        
        // Supprimer toutes les classes de validation
        Object.keys(validations).forEach(fieldName => {
            const field = validations[fieldName];
            field.input.classList.remove('valid', 'invalid');
            field.input.setAttribute('aria-invalid', 'false');
            field.error.textContent = '';
            field.error.classList.remove('visible');
        });

        // Désactiver le bouton submit
        submitBtn.disabled = true;
        submitBtn.classList.remove('loading');
        
        // Afficher le texte du bouton
        submitBtn.querySelector('.btn-text').style.display = 'inline';
        submitBtn.querySelector('.btn-loading').style.display = 'none';
    }

    // ===================================================================
    // EVENT LISTENERS - VALIDATION EN TEMPS RÉEL
    // ===================================================================

    // Validation sur blur (perte de focus) - UX: ne valide que si l'utilisateur a fini de taper
    Object.keys(validations).forEach(fieldName => {
        const field = validations[fieldName];
        
        // Validation au blur (quand l'utilisateur quitte le champ)
        field.input.addEventListener('blur', () => {
            validateField(fieldName);
            updateSubmitButton();
        });

        // Validation en temps réel pendant la saisie (après la première validation)
        field.input.addEventListener('input', () => {
            // Ne valider en temps réel que si le champ a déjà été validé une fois
            if (field.input.classList.contains('valid') || field.input.classList.contains('invalid')) {
                validateField(fieldName);
                updateSubmitButton();
            }
        });
    });

    // ===================================================================
    // SUBMIT HANDLER
    // ===================================================================

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validation complète avant soumission
        if (!validateAllFields()) {
            // Focus sur le premier champ invalide
            const firstInvalidField = form.querySelector('.invalid');
            if (firstInvalidField) {
                firstInvalidField.focus();
                // Annoncer aux lecteurs d'écran
                const errorSpan = firstInvalidField.parentElement.querySelector('.error-message');
                if (errorSpan) {
                    errorSpan.setAttribute('role', 'alert');
                }
            }
            return;
        }

        // État loading du bouton
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Masquer les messages précédents
        successMessage.style.display = 'none';
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }

        // Collecter les données du formulaire
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim()
        };

        try {
            // Envoi vers Formspree (Story 3.3)
            const response = await fetch('https://formspree.io/f/xrelnyrq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Succès - Email envoyé
                console.log('✅ Email envoyé avec succès via Formspree');

                // Afficher le message de succès
                successMessage.style.display = 'flex';
                successMessage.setAttribute('role', 'alert');
                successMessage.focus();

                // Réinitialiser le formulaire
                resetForm();

                // Masquer le message de succès après 8 secondes
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 8000);

                // Scroll vers le message de succès
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            } else {
                // Erreur validation Formspree
                const result = await response.json();
                const errorMsg = result.errors?.[0]?.message || 'Erreur lors de l\'envoi. Veuillez vérifier vos informations.';
                
                console.error('❌ Erreur Formspree:', result);
                showErrorMessage(errorMsg);
                
                // Réactiver le bouton
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }

        } catch (error) {
            console.error('❌ Erreur réseau:', error);
            
            // Erreur réseau ou serveur
            showErrorMessage('⚠️ Erreur technique. Veuillez réessayer ou me contacter directement à tya.desmet@gmail.com');
            
            // Réactiver le bouton
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    // ===================================================================
    // INITIALISATION
    // ===================================================================

    /**
     * Affiche un message d'erreur au-dessus du formulaire
     * @param {string} message - Message d'erreur à afficher
     */
    function showErrorMessage(message) {
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            errorMessage.querySelector('p').textContent = message;
            errorMessage.style.display = 'flex';
            errorMessage.setAttribute('role', 'alert');
            errorMessage.focus();
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Masquer après 10 secondes
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 10000);
        }
    }

    // Désactiver le bouton submit au chargement
    submitBtn.disabled = true;

    console.log('✅ Contact form validation initialized (Story 3.2)');
    console.log('✅ Formspree integration active (Story 3.3)');
});
