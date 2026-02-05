 
 
document.getElementById('aiForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent form from reloading page

  const loadingbar = document.getElementById("loading")
  const loadingbarTwo = document.getElementById("loadingTwo")
  const fileInput = document.getElementById('fileInput');
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  loadingbar.classList.remove("hidden")
  console.log("yuurrr")

  try {

    const res = await fetch('/ai/generateSuggestions', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    // Show the results on the page

    const sections = data.suggestions.split('---'); //splitting it up at the --- devideres the response gives back
    const ideas = sections.slice(1, 5);// only taking the actual ideas leaving the opning and closing p


    const splitIdeas = ideas.map(section => { // A function to execute for each element in the array. Its return value is added as a single element in the new array. - mdn
      const titleMatch = section.match(/\*\*(.*?)\*\*/)
      const title = titleMatch ? titleMatch[1] : "Untitled Idea"
      const body = section.replace(/^###\s*\d+\.\s*\*\*(.*?)\*\*/, '').trim();
      return { title, body }; // should give me an array of title, body pairs idk
      
    })
    const formatBodyForMarkdown = (body) => {
  return body
    .split('- ')
    .filter(line => line.trim() !== '')
    .map(line => `- ◾ ${line.trim()}`) // restore the dash for Markdown
    .join('\n')
    .replaceAll('###', ''); // line breaks between bullets
};
    


    console.log(splitIdeas)

    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = `


    
      <img class="max-h-120 max-w-90" src="${data.image}"" />
        <div class="flex-3">
            <h2>Upcycle Suggestions</h2>
            <div class="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" checked="checked" />

                <div class="collapse-title font-semibold">${marked.parse(splitIdeas[0].title)}</div>
                <div class="collapse-content text-sm">${marked.parse(formatBodyForMarkdown(splitIdeas[0].body))}
                    <button class="btn btn-sm btn-secondary generateMockupBtn"  data-idea="${encodeURIComponent(ideas[0])}"
        data-description="${encodeURIComponent(data.description)}">Generate Mockup</button>
                </div>

            </div>
            <div class="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />

                <div class="collapse-title font-semibold">${marked.parse(splitIdeas[1].title)}</div>
                <div class="collapse-content text-sm">${marked.parse(formatBodyForMarkdown(splitIdeas[1].body))}
                    <button class="btn btn-sm btn-secondary generateMockupBtn"  data-idea="${encodeURIComponent(ideas[1])}"
        data-description="${encodeURIComponent(data.description)}">Generate Mockup</button>
                </div>


            </div>
            <div class="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />

                <div class="collapse-title font-semibold">${marked.parse(splitIdeas[2].title)}</div>
                <div class="collapse-content text-sm">${marked.parse(formatBodyForMarkdown(splitIdeas[2].body))}
                    <button class="btn btn-sm btn-secondary generateMockupBtn" data-idea="${encodeURIComponent(ideas[2])}"
        data-description="${encodeURIComponent(data.description)}">Generate Mockup</button>
                </div>


            </div>
            <div class="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />

                <div class="collapse-title font-semibold">${marked.parse(splitIdeas[3].title)}</div>
                <div class="collapse-content text-sm">${marked.parse(formatBodyForMarkdown(splitIdeas[3].body))}
                    <button class="btn btn-sm btn-secondary generateMockupBtn" data-idea="${encodeURIComponent(ideas[3])}"
        data-description="${encodeURIComponent(data.description)}">Generate Mockup</button>
                </div>


            </div>
        </div>`;
document.querySelectorAll('.generateMockupBtn').forEach(button => {
  button.addEventListener('click', async function () {
    const idea = decodeURIComponent(this.dataset.idea)
    const loadingbarTwo = document.getElementById("loadingTwo")
    const description = decodeURIComponent(this.dataset.description)
    loadingbarTwo.classList.remove("hidden")

  try {

    const res = await fetch('/ai/generateMockup', {
      method: 'POST',
       headers: {
          'Content-Type': 'application/json'
        },
      body: JSON.stringify({ idea, description })
    });

    const data = await res.json();

    const mockupContainer = document.getElementById('mockupContainer');
    const guestCTA = window.isGuest ? `
      <div class="alert alert-info mt-4">
        <a href="/signup" class="btn btn-primary">Sign up</a> to save your designs and share with the community!
      </div>
    ` : '';
    mockupContainer.innerHTML = `
    <h3>Here's your Mockup</h3>
    <img src="${data.image}" class="w-1/1 rounded shadow" />
    ${guestCTA}
      `;
  } catch (err) {
    console.error('Mockup generation failed:', err);
    }
    loadingbarTwo.classList.add("hidden")
  });
});
  } catch (err) {
    console.error('Error:', err);
  }
  loadingbar.classList.add("hidden")
  
});

