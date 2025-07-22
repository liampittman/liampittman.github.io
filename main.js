// Project URLs for iframe embedding
        const projectUrls = {
            'migration-modal': 'https://example-news-site.com/climate-migration',
            'heat-modal': 'https://example-publication.com/heat-islands'
        };

        // Function to open modal with iframe
        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            const iframe = modal.querySelector('.modal-iframe');
            const notice = modal.querySelector('.iframe-notice');
            
            // Set iframe source
            if (projectUrls[modalId]) {
                iframe.src = projectUrls[modalId];
                
                // Show notice for external content
                notice.style.display = 'block';
                
                // Handle iframe load errors
                iframe.onload = function() {
                    // Hide notice if iframe loads successfully
                    setTimeout(() => {
                        notice.style.display = 'none';
                    }, 3000);
                };
                
                iframe.onerror = function() {
                    // Show error message if iframe fails to load
                    notice.innerHTML = `
                        Unable to load embedded content. This site may not allow embedding. 
                        <a href="${projectUrls[modalId]}" target="_blank">View original article</a>
                    `;
                    notice.style.display = 'block';
                    notice.style.background = '#F8D7DA';
                    notice.style.color = '#721C24';
                    notice.style.borderColor = '#F5C6CB';
                };
            }
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        // Function to close modal
        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            const iframe = modal.querySelector('.modal-iframe');
            
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Clear iframe source to stop loading
            iframe.src = '';
        }

        // Close modal when clicking outside of it
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                const modalId = event.target.id;
                closeModal(modalId);
            }
        }

        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                const openModal = document.querySelector('.modal[style*="block"]');
                if (openModal) {
                    closeModal(openModal.id);
                }
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add scroll-based animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = '0.2s';
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe all elements that should animate
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Add active navigation highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const sectionHeight = section.clientHeight;
                if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Add subtle parallax effect to hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
