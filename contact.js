
   
    document.addEventListener('DOMContentLoaded', function() {
      const contactForm = document.getElementById('contact-form');
      const successMessage = document.getElementById('success-message');
      
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        
        const name = document.getElementById('cname').value.trim();
        const email = document.getElementById('cemail').value.trim();
        const subject = document.getElementById('csubject').value.trim();
        const message = document.getElementById('cmsg').value.trim();
        
        if (!name || !email || !subject || !message) {
          alert('Please fill in all fields before submitting.');
          return;
        }
        
       
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Please enter a valid email address.');
          return;
        }
        
        
        successMessage.style.display = 'block';
        contactForm.reset();
  
        successMessage.scrollIntoView({ behavior: 'smooth' });
        
       
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 5000);
      });
    });

        
        const parishes = [
            {
                id: 'kingston',
                name: 'Kingston',
                position: { left: '68%', top: '70%', width: '10%', height: '12%' },
                capital: 'Kingston',
                population: '96,052',
                area: '22 km²',
                info: 'Kingston is the capital and largest city of Jamaica. We provide comprehensive services throughout the Kingston metropolitan area.'
            },
            {
                id: 'st-andrew',
                name: 'St. Andrew',
                position: { left: '58%', top: '60%', width: '18%', height: '22%' },
                capital: 'Half Way Tree',
                population: '573,369',
                area: '431 km²',
                info: 'St. Andrew surrounds Kingston and is the most populous parish. Our services cover both urban and rural areas.'
            },
            {
                id: 'st-catherine',
                name: 'St. Catherine',
                position: { left: '48%', top: '60%', width: '22%', height: '22%' },
                capital: 'Spanish Town',
                population: '516,218',
                area: '1,192 km²',
                info: 'St. Catherine is the second most populous parish. We serve both urban centers and agricultural areas.'
            },
            {
                id: 'clarendon',
                name: 'Clarendon',
                position: { left: '38%', top: '58%', width: '22%', height: '22%' },
                capital: 'May Pen',
                population: '245,103',
                area: '1,196 km²',
                info: 'Clarendon is known for its agricultural production. Our services extend to all communities in this parish.'
            },
            {
                id: 'manchester',
                name: 'Manchester',
                position: { left: '42%', top: '45%', width: '18%', height: '18%' },
                capital: 'Mandeville',
                population: '185,801',
                area: '830 km²',
                info: 'Manchester is located in central Jamaica. We serve both Mandeville and rural communities.'
            },
            {
                id: 'st-elizabeth',
                name: 'St. Elizabeth',
                position: { left: '28%', top: '55%', width: '22%', height: '22%' },
                capital: 'Black River',
                population: '150,205',
                area: '1,212 km²',
                info: 'St. Elizabeth is known as the "breadbasket" of Jamaica. Our agricultural services are strong here.'
            },
            {
                id: 'westmoreland',
                name: 'Westmoreland',
                position: { left: '18%', top: '50%', width: '18%', height: '22%' },
                capital: 'Savanna-la-Mar',
                population: '138,947',
                area: '807 km²',
                info: 'Westmoreland has significant agricultural and tourism sectors. We serve communities across the parish.'
            },
            {
                id: 'hanover',
                name: 'Hanover',
                position: { left: '12%', top: '45%', width: '14%', height: '18%' },
                capital: 'Lucea',
                population: '69,533',
                area: '450 km²',
                info: 'Hanover is on Jamaica\'s north coast. Our services extend to both coastal and inland communities.'
            },
            {
                id: 'st-james',
                name: 'St. James',
                position: { left: '22%', top: '35%', width: '14%', height: '18%' },
                capital: 'Montego Bay',
                population: '184,662',
                area: '595 km²',
                info: 'St. James is home to Montego Bay. We provide specialized services for the tourism industry here.'
            },
            {
                id: 'trelawny',
                name: 'Trelawny',
                position: { left: '32%', top: '30%', width: '18%', height: '18%' },
                capital: 'Falmouth',
                population: '75,164',
                area: '875 km²',
                info: 'Trelawny is known for sugar estates. Our services support both agriculture and tourism.'
            },
            {
                id: 'st-ann',
                name: 'St. Ann',
                position: { left: '47%', top: '30%', width: '18%', height: '18%' },
                capital: 'St. Ann\'s Bay',
                population: '172,362',
                area: '1,213 km²',
                info: 'St. Ann is the birthplace of Bob Marley. We serve communities across this culturally rich parish.'
            },
            {
                id: 'st-mary',
                name: 'St. Mary',
                position: { left: '57%', top: '35%', width: '18%', height: '18%' },
                capital: 'Port Maria',
                population: '113,615',
                area: '611 km²',
                info: 'St. Mary is known for agricultural production. Our services support the farming communities here.'
            },
            {
                id: 'portland',
                name: 'Portland',
                position: { left: '67%', top: '30%', width: '18%', height: '22%' },
                capital: 'Port Antonio',
                population: '81,744',
                area: '814 km²',
                info: 'Portland is famous for lush vegetation. We provide services to coastal and mountain communities.'
            },
            {
                id: 'st-thomas',
                name: 'St. Thomas',
                position: { left: '72%', top: '55%', width: '14%', height: '18%' },
                capital: 'Morant Bay',
                population: '93,902',
                area: '743 km²',
                info: 'St. Thomas is the easternmost parish. Our services extend to all communities in this area.'
            }
        ];

      
        document.addEventListener('DOMContentLoaded', function() {
           
            const mapContainer = document.getElementById('jamaicaMap');
            const parishList = document.getElementById('parishList');
            const parishDetails = document.getElementById('parishDetails');
            
           
            function createMapParishes() {
                parishes.forEach(parish => {
                   
                    const parishElement = document.createElement('div');
                    parishElement.className = 'parish';
                    parishElement.id = `map-${parish.id}`;
                    parishElement.textContent = parish.name;
                    parishElement.style.left = parish.position.left;
                    parishElement.style.top = parish.position.top;
                    parishElement.style.width = parish.position.width;
                    parishElement.style.height = parish.position.height;
                    
                   
                    parishElement.addEventListener('click', function() {
                        selectParish(parish.id);
                    });
                    
                    mapContainer.appendChild(parishElement);
                });
            }
            
           
            function createParishList() {
                parishes.forEach(parish => {
                    
                    const listItem = document.createElement('div');
                    listItem.className = 'parish-item';
                    listItem.id = `list-${parish.id}`;
                    listItem.textContent = parish.name;
                    
                    
                    listItem.addEventListener('click', function() {
                        selectParish(parish.id);
                    });
                    
                    parishList.appendChild(listItem);
                });
            }
            
            
            function selectParish(parishId) {
                
                document.querySelectorAll('.parish').forEach(el => {
                    el.classList.remove('selected');
                });
                document.querySelectorAll('.parish-item').forEach(el => {
                    el.classList.remove('selected');
                });
                
                
                document.getElementById(`map-${parishId}`).classList.add('selected');
                document.getElementById(`list-${parishId}`).classList.add('selected');
                
               
                const parish = parishes.find(p => p.id === parishId);
                
             
                parishDetails.innerHTML = `
                    <h3>${parish.name} Parish</h3>
                    <p><strong>Capital:</strong> ${parish.capital}</p>
                    <p><strong>Population:</strong> ${parish.population}</p>
                    <p><strong>Area:</strong> ${parish.area}</p>
                    <p>${parish.info}</p>
                    <p><em>We provide comprehensive services throughout ${parish.name} Parish.</em></p>
                `;
            }
            
           
            createMapParishes();
            createParishList();
            
          
            selectParish('kingston');
        });
    