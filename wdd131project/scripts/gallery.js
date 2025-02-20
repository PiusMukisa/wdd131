// Gallery Functionality
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const galleryGrid = document.getElementById('gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const loadMoreBtn = document.getElementById('load-more');
    const photoCountEl = document.getElementById('photo-count');
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');
    const modalLocation = document.getElementById('modal-location');
    const modalDate = document.getElementById('modal-date');
    const prevBtn = document.querySelector('.prev-photo');
    const nextBtn = document.querySelector('.next-photo');
    const closeBtn = document.querySelector('.close-modal');
  
    // Gallery state
    let currentCategory = 'all';
    let currentPage = 1;
    let itemsPerPage = 12;
    let currentGalleryItems = [];
    let currentImageIndex = 0;
    let isLoading = false;
  
    // Mock photo data - in a real application, this would come from an API or database
    const mockPhotoData = [
      {
        id: 1,
        title: 'Alpine Dawn',
        description: 'The first light of day breaks over the snow-capped Alps, painting the sky in gradients of orange and pink. The tranquil lake below perfectly mirrors the majestic mountains.',
        category: 'landscape',
        location: 'Swiss Alps',
        date: 'March 2023',
        thumbnail: 'images/alphineimage.jpg',
        fullImage: 'images/alphineimage.jpg'
      },
      {
        id: 2,
        title: 'Tokyo Lights',
        description: 'The neon glow of Tokyo at night creates a cyberpunk atmosphere. The city never sleeps, with millions of lights illuminating the urban landscape.',
        category: 'urban',
        location: 'Tokyo, Japan',
        date: 'January 2023',
        thumbnail: 'images/Tokyo.jpg',
        fullImage: 'images/Tokyo.jpg'
      },
      {
        id: 3,
        title: 'Desert Dreams',
        description: 'Golden hour in the Sahara Desert creates a magical landscape of endless sand dunes. Each ridge is highlighted by the setting sun, creating a sea of gold.',
        category: 'landscape',
        location: 'Sahara Desert',
        date: 'November 2022',
        thumbnail: 'images/dreamdesert.jpg',
        fullImage: 'images/dreamdesert.jpg'
      },
      {
        id: 4,
        title: 'Paradise Found',
        description: 'Crystal clear turquoise waters meet pristine white sand beaches in this tropical paradise. Palm trees sway gently in the ocean breeze.',
        category: 'landscape',
        location: 'Maldives',
        date: 'February 2023',
        thumbnail: 'images/paradise.jpg',
        fullImage: 'images/paradise.jpg'
      },
      {
        id: 5,
        title: 'Local Fisherman',
        description: 'An elderly fisherman mends his nets with weathered hands that tell stories of a lifetime at sea. His face shows the wisdom earned through years of working with the ocean.',
        category: 'portrait',
        location: 'Vietnam',
        date: 'December 2022',
        thumbnail: 'images/fishers.jpg',
        fullImage: 'images/fishers.jpg'
      },
      {
        id: 6,
        title: 'Autumn Forest',
        description: 'A pathway through a forest ablaze with autumn colors. Red, orange, and golden leaves create a canopy that filters the sunlight into a warm glow.',
        category: 'landscape',
        location: 'Vermont, USA',
        date: 'October 2022',
        thumbnail: 'images/darkforest.jpg',
        fullImage: 'images/darkforest.jpg'
      },
      {
        id: 7,
        title: 'Arctic Fox',
        description: 'An Arctic fox in its white winter coat blends almost perfectly with the snowy landscape. Only its alert black eyes and nose give away its presence.',
        category: 'wildlife',
        location: 'Iceland',
        date: 'January 2023',
        thumbnail: 'images/fox.jpg',
        fullImage: 'images/fox.jpg'
      },
      {
        id: 8,
        title: 'Venetian Canals',
        description: 'Early morning in Venice before the tourists arrive. The historic buildings reflect in the still canal waters as gondolas wait for the day to begin.',
        category: 'urban',
        location: 'Venice, Italy',
        date: 'April 2023',
        thumbnail: 'images/canal.jpg',
        fullImage: 'images/canal.jpg'
      },
      {
        id: 9,
        title: 'Market Vendor',
        description: 'A colorful portrait of a woman selling exotic fruits at a local market. Her bright clothing and warm smile invite customers to her stall.',
        category: 'portrait',
        location: 'Marrakech, Morocco',
        date: 'May 2023',
        thumbnail: 'images/germanshephaerd.jpg',
        fullImage: 'images/germanshephaerd.jpg'
      },
      {
        id: 10,
        title: 'Great Migration',
        description: 'Thousands of wildebeest cross the Mara River during the annual Great Migration. The dramatic crossing is one of nature most spectacular events.',
        category: 'wildlife',
        location: 'Serengeti, Tanzania',
        date: 'August 2022',
        thumbnail: 'images/migraation.jpg',
        fullImage: 'images/migraation.jpg'
      },
      {
        id: 11,
        title: 'Antelope Canyon',
        description: 'Sunlight filters through the narrow slot canyon, creating magical light beams that illuminate the smooth, flowing sandstone walls.',
        category: 'landscape',
        location: 'Arizona, USA',
        date: 'June 2023',
        thumbnail: 'images/croyon.jpg',
        fullImage: 'images/croyon.jpg'
      },
      {
        id: 12,
        title: 'Kyoto Temples',
        description: 'Ancient temples and pagodas nestled among Japanese maple trees. The traditional architecture creates a peaceful harmony with nature.',
        category: 'urban',
        location: 'Kyoto, Japan',
        date: 'November 2022',
        thumbnail: 'images/kyoto.jpg',
        fullImage: 'images/kyoto.jpg'
      },
      {
          id: 13,
          title: 'Hummingbird',
          description: 'A ruby-throated hummingbird hovers mid-air, its wings beating so fast they are nearly invisible. The iridescent feathers catch the light as it feeds.',
          category: 'wildlife',
          location: 'Costa Rica',
          date: 'March 2023',
          thumbnail: 'images/hummingbird.jpg',
          fullImage: 'images/hummingbird.jpg'
        },
        {
          id: 14,
          title: 'Havana Streets',
          description: 'Vintage cars cruise down the colorful streets of Old Havana. The vibrant buildings and classic automobiles create a nostalgic atmosphere.',
          category: 'urban',
          location: 'Havana, Cuba',
          date: 'February 2023',
          thumbnail: 'images/streets.jpg',
          fullImage: 'images/streets.jpg'
        },
        {
          id: 15,
          title: 'Mountain Shepherd',
          description: 'A weathered shepherd from the high mountains with his trusty dog. His face tells the story of a life lived in harmony with nature and the changing seasons.',
          category: 'portrait',
          location: 'Himalayas, Nepal',
          date: 'April 2023',
          thumbnail: 'images/germanshephaerd.jpg',
          fullImage: 'images/germanshephaerd.jpg'
        },
        {
          id: 16,
          title: 'Aurora Borealis',
          description: 'The Northern Lights dance across the Arctic sky, creating curtains of green, purple, and blue light. The remote cabin provides scale to the immense natural light show.',
          category: 'landscape',
          location: 'Lofoten, Norway',
          date: 'January 2023',
          thumbnail: 'images/aurora.jpg',
          fullImage: 'images/aurora.jpg'
        },
        {
          id: 17,
          title: 'Leopard in Tree',
          description: 'A leopard rests on a branch after a successful hunt. The big cats spotted coat provides perfect camouflage among the dappled light of the acacia tree.',
          category: 'wildlife',
          location: 'Masai Mara, Kenya',
          date: 'July 2022',
          thumbnail: 'images/leopard.jpg',
          fullImage: 'images/leopard.jpg'
        },
        {
          id: 18,
          title: 'Brooklyn Bridge',
          description: 'The iconic Brooklyn Bridge at blue hour, when the city lights begin to twinkle and the sky fades to deep blue. The historic bridge connects Manhattan to Brooklyn.',
          category: 'urban',
          location: 'New York, USA',
          date: 'May 2023',
          thumbnail: 'images/bridge.jpg',
          fullImage: 'images/bridge.jpg'
        },
        {
          id: 19,
          title: 'Balinese Dancer',
          description: 'A traditional Balinese dancer in elaborate costume performs a sacred dance. Her precise movements and expressive eyes tell ancient stories from Indonesian mythology.',
          category: 'portrait',
          location: 'Bali, Indonesia',
          date: 'March 2023',
          thumbnail: 'images/dancer.jpg',
          fullImage: 'images/dancer.jpg'
        },
        {
          id: 20,
          title: 'Milky Way',
          description: 'The Milky Way arches across the night sky above a dramatic mountain landscape. Far from city lights, thousands of stars are visible to the naked eye.',
          category: 'landscape',
          location: 'Atacama Desert, Chile',
          date: 'September 2022',
          thumbnail: 'images/mulkyway.jpg',
          fullImage: 'images/mulkyway.jpg'
        },
        {
          id: 21,
          title: 'Elephant Herd',
          description: 'A family of elephants crosses the savanna at sunset. The matriarch leads the way as youngsters stay protected within the group.',
          category: 'wildlife',
          location: 'Botswana',
          date: 'October 2022',
          thumbnail: 'images/elephant.jpg',
          fullImage: 'images/elephant.jpg'
        },
        {
          id: 22,
          title: 'Santorini Sunset',
          description: 'The white-washed buildings of Santorini glow in the golden light of sunset. Blue domes and narrow pathways create the iconic Greek island scene.',
          category: 'urban',
          location: 'Santorini, Greece',
          date: 'June 2023',
          thumbnail: 'images/sunrising.jpg',
          fullImage: 'images/sunrising.jpg'
        },
        {
          id: 23,
          title: 'Monk Meditation',
          description: 'A Buddhist monk in deep meditation at an ancient temple. His serene expression reflects years of spiritual practice and inner peace.',
          category: 'portrait',
          location: 'Chiang Mai, Thailand',
          date: 'February 2023',
          thumbnail: 'images/santoni.jpg',
          fullImage: 'images/santoni.jpg'
        },
        {
          id: 24,
          title: 'Icelandic Waterfall',
          description: 'Powerful Skógafoss waterfall thunders down the cliffs, creating a perpetual rainbow in the mist. The scale of Icelands landscape is humbling.',
          category: 'landscape',
          location: 'Iceland',
          date: 'July 2023',
          thumbnail: 'images/waterfalls.jpg',
          fullImage: 'images/waterfalls.jpg'
        }
    ];
  
    // Function to filter gallery items by category
    const filterGallery = (category) => {
      currentCategory = category;
      currentPage = 1;
      
      galleryGrid.classList.add('loading');
      
      // Clear existing content
      galleryGrid.innerHTML = '';
      
      // Show loading indicator
      const loadingEl = document.createElement('div');
      loadingEl.className = 'loading-container';
      loadingEl.innerHTML = '<div class="loading-spinner"></div>';
      galleryGrid.appendChild(loadingEl);
      
      // Simulate API request delay
      setTimeout(() => {
        galleryGrid.innerHTML = '';
        
        // Filter photos based on selected category
        const filteredPhotos = category === 'all' 
          ? mockPhotoData 
          : mockPhotoData.filter(photo => photo.category === category);
        
        currentGalleryItems = filteredPhotos;
        
        // Update photo count
        photoCountEl.textContent = filteredPhotos.length;
        
        if (filteredPhotos.length === 0) {
          // Show no results message
          const noResults = document.createElement('div');
          noResults.className = 'no-results';
          noResults.innerHTML = `
            <i class="fas fa-search"></i>
            <p>No photos found in this category</p>
          `;
          galleryGrid.appendChild(noResults);
          loadMoreBtn.style.display = 'none';
        } else {
          // Load first page of results
          loadGalleryItems(filteredPhotos.slice(0, itemsPerPage));
          
          // Show/hide load more button
          if (filteredPhotos.length > itemsPerPage) {
            loadMoreBtn.style.display = 'inline-block';
          } else {
            loadMoreBtn.style.display = 'none';
          }
        }
        
        galleryGrid.classList.remove('loading');
      }, 800);
    };
  
    // Function to create and append gallery items
    const loadGalleryItems = (items) => {
      items.forEach((photo, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-index', index);
        
        // Set a staggered animation delay based on index
        galleryItem.style.animationDelay = `${(index % itemsPerPage) * 0.1}s`;
        
        galleryItem.innerHTML = `
          <img src="${photo.thumbnail}" alt="${photo.title}">
          <div class="gallery-overlay">
            <h3>${photo.title}</h3>
            <div class="photo-meta">
              <span><i class="fas fa-map-marker-alt"></i> ${photo.location}</span>
              <span><i class="fas fa-calendar"></i> ${photo.date}</span>
            </div>
          </div>
        `;
        
        // Add click event to open modal
        galleryItem.addEventListener('click', () => {
          openModal(index + (currentPage - 1) * itemsPerPage);
        });
        
        galleryGrid.appendChild(galleryItem);
      });
    };
  
    // Function to load more gallery items
    const loadMoreItems = () => {
      if (isLoading) return;
      
      isLoading = true;
      loadMoreBtn.innerHTML = '<div class="loading-spinner" style="width:20px;height:20px;margin:0 auto;"></div>';
      
      // Calculate next page of items
      const nextPage = currentPage + 1;
      const startIndex = (nextPage - 1) * itemsPerPage;
      const endIndex = nextPage * itemsPerPage;
      
      // Get next batch of filtered items
      const nextItems = currentGalleryItems.slice(startIndex, endIndex);
      
      // Simulate loading delay
      setTimeout(() => {
        // Add new items to gallery
        loadGalleryItems(nextItems);
        
        // Update current page
        currentPage = nextPage;
        
        // Hide load more button if all items are loaded
        if (endIndex >= currentGalleryItems.length) {
          loadMoreBtn.style.display = 'none';
        }
        
        loadMoreBtn.textContent = 'Load More';
        isLoading = false;
      }, 1000);
    };
  
    // Function to open image modal
    const openModal = (index) => {
      currentImageIndex = index;
      const photo = currentGalleryItems[index];
      
      // Reset modal image
      modalImage.src = '';
      modalImage.classList.remove('loaded');
      
      // Update modal content
      modalTitle.textContent = photo.title;
      modalDesc.textContent = photo.description;
      modalLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${photo.location}`;
            modalDate.innerHTML = `<i class="fas fa-calendar"></i> ${photo.date}`;
          };
      
          // Add event listeners
          filterButtons.forEach(button => {
            button.addEventListener('click', () => {
              filterGallery(button.getAttribute('data-category'));
            });
          });
      
          loadMoreBtn.addEventListener('click', loadMoreItems);
          closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
          });
      
          prevBtn.addEventListener('click', () => {
            if (currentImageIndex > 0) {
              openModal(currentImageIndex - 1);
            }
          });
      
          nextBtn.addEventListener('click', () => {
            if (currentImageIndex < currentGalleryItems.length - 1) {
              openModal(currentImageIndex + 1);
            }
          });
      
          // Initial load
          filterGallery('all');
      });