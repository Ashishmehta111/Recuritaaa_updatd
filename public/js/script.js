var card=document.getElementById("card");         
function openRegister()
     {
     card.style.transform = "rotateY(-180deg)";	
     }	
function openLogin()
     {
         card.style.transform = "rotateY(0deg)";	
     }	
const candidates = [
     {
       name: "John Doe",
       location: "New York",
       jobRole: "Software Developer"
     },
     {
       name: "Jane Smith",
       location: "San Francisco",
       jobRole: "Project Manager"
     },
     {
       name: "Alex Johnson",
       location: "London",
       jobRole: "Data Analyst"
     },
     {
       name: "Emily Brown",
       location: "New York",
       jobRole: "UX Designer"
     }
   ];
   
   function searchCandidates() {
     const locationInput = document.getElementById("location");
     const jobRoleInput = document.getElementById("job-role");
     const candidateList = document.getElementById("candidate-list");
   
     const location = locationInput.value.toLowerCase();
     const jobRole = jobRoleInput.value.toLowerCase();
   
     // Clear the candidate list
     candidateList.innerHTML = "";
   
     // Filter candidates based on location and job role
     const filteredCandidates = candidates.filter(candidate => {
       const candidateLocation = candidate.location.toLowerCase();
       const candidateJobRole = candidate.jobRole.toLowerCase();
       return candidateLocation.includes(location) && candidateJobRole.includes(jobRole);
     });
   
     // Display the filtered candidates
     filteredCandidates.forEach(candidate => {
       const card = document.createElement("div");
       card.classList.add("candidate-card");
   
       const name = document.createElement("h3");
       name.textContent = candidate.name;
   
       const location = document.createElement("p");
       location.textContent = "Location: " + candidate.location;
   
       const jobRole = document.createElement("p");
       jobRole.textContent = "Job Role: " + candidate.jobRole;
   
       card.appendChild(name);
       card.appendChild(location);
       card.appendChild(jobRole);
   
       candidateList.appendChild(card);
     });
   }
   