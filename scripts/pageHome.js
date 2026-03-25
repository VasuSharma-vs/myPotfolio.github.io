// Enhanced JavaScript for interactive portfolio
// Handles modals, animations, and interactive features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize modal and lightbox functionality
  initializeModal();
  
  // Initialize scroll-based animations
  initializeScrollAnimations();

  // Smooth scrolling for anchor links
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

  // Add hover effects for skill pills
  const skillPills = document.querySelectorAll('.skill-pill');
  skillPills.forEach(pill => {
    pill.addEventListener('mouseenter', function() {
      this.style.borderColor = 'var(--gold)';
      this.style.color = 'var(--gold)';
      this.style.transform = 'translateY(-2px)';
    });
    pill.addEventListener('mouseleave', function() {
      this.style.borderColor = 'var(--border)';
      this.style.color = '#c8c4bc';
      this.style.transform = 'translateY(0)';
    });
  });

  // Add click effects for project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
      this.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.15)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  });

  // Add hover effects for tags
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.color = 'var(--gold)';
    });
    tag.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.color = 'inherit';
    });
  });
});

// Modal/Lightbox Functionality
function initializeModal() {
  // Create modal overlay if it doesn't exist
  let modal = document.querySelector('.modal-overlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <img src="" alt="Enlarged view">
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Add click handlers to all clickable images
  const clickableImages = document.querySelectorAll('.clickable-image');
  clickableImages.forEach(img => {
    img.addEventListener('click', function(e) {
      e.stopPropagation();
      const modalImg = modal.querySelector('img');
      modalImg.src = this.src;
      modalImg.alt = this.alt;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal functionality
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.addEventListener('click', function() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // Close modal when clicking outside the image
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// Scroll-based animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-on-scroll');
        // You can optionally unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all project cards and major sections
  const elementsToAnimate = document.querySelectorAll(
    '.section, .project-card, .skill-pill, .asset-card'
  );
  
  elementsToAnimate.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
}