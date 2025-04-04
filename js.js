document.addEventListener('DOMContentLoaded', function() {
    // Project data
    const projects = [
        {
            id: 1,
            title: "Ongoing Construction",
            description: "Residential/Commercial Construction",
            images: [
                "imgs/CANOPY/canopy1.jpg",
                "imgs/CANOPY/canopy2.jpg",
                "imgs/CANOPY/canopy3.jpg",
                "imgs/CANOPY/canopy4.jpg"
            ]
        },
        {
            id: 2,
            title: "Completed Projects",
            description: "Compilation of completed projects",
            images: [
                "imgs/FENCE/fence1.jpg"
            ]
        },
        {
            id: 3,
            title: "Special Projects",
            description: "Custom/Special Projects",
            images: [
                "imgs/WCC/WCCcompleted.jpg"
            ]
        }
    ];

    let currentProjectId = 0;
    let slideIndex = 1;

    // Open modal function
    window.openModal = function(projectId) {
        currentProjectId = projectId;
        const project = projects.find(p => p.id === projectId);
        
        if (!project) {
            console.error("Project not found!");
            return;
        }

        const modal = document.getElementById('projectModal');
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        
        document.getElementById('modalProjectTitle').textContent = project.title;
        document.getElementById('modalProjectDesc').textContent = project.description;
        
        // Clear previous slides
        const slideshowContainer = document.querySelector('.slideshow-container');
        slideshowContainer.innerHTML = '';
        
        const dotsContainer = document.querySelector('.dots-container');
        dotsContainer.innerHTML = '';
        
        // Create slides and dots
        project.images.forEach((image, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.className = 'mySlides fade';
            const img = document.createElement('img');
            img.src = image;
            img.alt = `${project.title} - Image ${index + 1}`;
            slide.appendChild(img);
            slideshowContainer.appendChild(slide);
            
            // Create dot
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.onclick = function() { currentSlide(index + 1); };
            dotsContainer.appendChild(dot);
        });
        
        // Show first slide
        slideIndex = 1;
        showSlides(slideIndex);

        document.body.classList.add('modal-open');
    };

    // Close modal function
    window.closeModal = function() {
        document.getElementById('projectModal').style.display = "none";
        document.body.style.overflow = "auto";
        document.body.classList.remove('modal-open');
    };

    // Navigation functions
    window.plusSlides = function(n) {
        showSlides(slideIndex += n);
    };

    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    };

    function showSlides(n) {
        let i;
        const slides = document.getElementsByClassName("mySlides");
        const dots = document.getElementsByClassName("dot");
        
        if (slides.length === 0) return;
        
        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        
        if (slides[slideIndex-1]) slides[slideIndex-1].style.display = "block";
        if (dots[slideIndex-1]) dots[slideIndex-1].className += " active";
    }

    // Close when clicking outside modal
    document.getElementById('projectModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // Close with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            closeModal();
        }
    });
});