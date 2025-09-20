 // Character counters
        function setupCharacterCounter(textareaId, counterId, maxLength) {
            const textarea = document.getElementById(textareaId);
            const counter = document.getElementById(counterId);
            
            function updateCounter() {
                const currentLength = textarea.value.length;
                counter.textContent = `${currentLength}/${maxLength}`;
                
                // Change color based on usage
                if (currentLength > maxLength * 0.9) {
                    counter.className = 'character-counter danger';
                } else if (currentLength > maxLength * 0.7) {
                    counter.className = 'character-counter warning';
                } else {
                    counter.className = 'character-counter';
                }
            }
            
            textarea.addEventListener('input', updateCounter);
            updateCounter(); // Initial update
        }

        // Setup all character counters
        setupCharacterCounter('subject', 'subjectCounter', 100);
        setupCharacterCounter('feedback', 'feedbackCounter', 2000);
        setupCharacterCounter('suggestions', 'suggestionsCounter', 1000);

        // Form submission
        document.getElementById('feedbackForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const feedbackData = {
                category: formData.get('category'),
                subject: formData.get('subject'),
                feedback: formData.get('feedback'),
                urgency: formData.get('urgency'),
                suggestions: formData.get('suggestions'),
                timestamp: new Date().toISOString(),
                id: 'feedback_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
            };
            
            // Simulate form submission (in a real app, this would send to a server)
            console.log('Feedback submitted:', feedbackData);
            
            // Show success message
            document.getElementById('successMessage').classList.add('show');
            
            // Hide form temporarily
            this.style.display = 'none';
            
            // Scroll to success message
            document.getElementById('successMessage').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Reset form after 5 seconds and show it again
            setTimeout(() => {
                this.reset();
                this.style.display = 'block';
                document.getElementById('successMessage').classList.remove('show');
                
                // Reset character counters
                document.getElementById('subjectCounter').textContent = '0/100';
                document.getElementById('feedbackCounter').textContent = '0/2000';
                document.getElementById('suggestionsCounter').textContent = '0/1000';
                
                // Reset counter colors
                document.getElementById('subjectCounter').className = 'character-counter';
                document.getElementById('feedbackCounter').className = 'character-counter';
                document.getElementById('suggestionsCounter').className = 'character-counter';
            }, 5000);
        });

        // Scroll to top function
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Auto-save draft to prevent data loss (stored locally, not sent anywhere)
        let autoSaveTimer;
        function autoSave() {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = setTimeout(() => {
                const formData = {
                    category: document.querySelector('input[name="category"]:checked')?.value || '',
                    subject: document.getElementById('subject').value,
                    feedback: document.getElementById('feedback').value,
                    urgency: document.querySelector('input[name="urgency"]:checked')?.value || '',
                    suggestions: document.getElementById('suggestions').value
                };
                
                // Only save if there's actual content
                if (formData.subject || formData.feedback) {
                    localStorage.setItem('feedbackDraft', JSON.stringify(formData));
                }
            }, 1000);
        }

        // Load draft on page load
        window.addEventListener('load', () => {
            const draft = localStorage.getItem('feedbackDraft');
            if (draft) {
                const data = JSON.parse(draft);
                
                // Restore form data
                if (data.category) {
                    document.querySelector(`input[name="category"][value="${data.category}"]`).checked = true;
                }
                if (data.subject) {
                    document.getElementById('subject').value = data.subject;
                }
                if (data.feedback) {
                    document.getElementById('feedback').value = data.feedback;
                }
                if (data.urgency) {
                    document.querySelector(`input[name="urgency"][value="${data.urgency}"]`).checked = true;
                }
                if (data.suggestions) {
                    document.getElementById('suggestions').value = data.suggestions;
                }
                
                // Update character counters
                document.getElementById('subjectCounter').textContent = `${data.subject.length}/100`;
                document.getElementById('feedbackCounter').textContent = `${data.feedback.length}/2000`;
                document.getElementById('suggestionsCounter').textContent = `${data.suggestions.length}/1000`;
            }
        });

        // Add auto-save listeners
        document.getElementById('subject').addEventListener('input', autoSave);
        document.getElementById('feedback').addEventListener('input', autoSave);
        document.getElementById('suggestions').addEventListener('input', autoSave);
        document.querySelectorAll('input[name="category"]').forEach(input => {
            input.addEventListener('change', autoSave);
        });
        document.querySelectorAll('input[name="urgency"]').forEach(input => {
            input.addEventListener('change', autoSave);
        });

        // Clear draft after successful submission
        document.getElementById('feedbackForm').addEventListener('submit', () => {
            localStorage.removeItem('feedbackDraft');
        });

        // Clear draft when form is reset
        document.getElementById('feedbackForm').addEventListener('reset', () => {
            localStorage.removeItem('feedbackDraft');
        });

        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            const scrollButton = document.querySelector('.up');
            if (window.pageYOffset > 300) {
                scrollButton.style.display = 'flex';
            } else {
                scrollButton.style.display = 'none';
            }
        });