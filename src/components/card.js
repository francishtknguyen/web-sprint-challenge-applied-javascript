const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const card = document.createElement("div");
  const headline = document.createElement("div");
  const author = document.createElement("div");
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  const span = document.createElement("span");

  card.classList.add("card");
  headline.classList.add("headline");
  author.classList.add("author");
  imgContainer.classList.add("img-container");

  headline.textContent = article.headline;
  img.src = article.authorPhoto;
  span.textContent = `By ${article.authorName}`;

  card.append(headline, author);
  author.append(imgContainer, span);
  imgContainer.appendChild(img);

  card.addEventListener('click', event => {
    console.log(article.headline);
  });

  return card;
}
// const cardContainer = document.querySelector('.cards-container') 

// const hello ={
//   "id": "1e602998-0139-4c62-9878-5caddc04924b",
//   "headline": "ES8: The Next Step in the Evolution of Javascript and What it Means For Your Projects",
//   "authorPhoto": "https://tk-assets.lambdaschool.com/08d1372e-e393-47f1-ac44-fcb7d0baf0e2_sir.jpg",
//   "authorName": "SIR RUFF'N'STUFF"
// }
// cardContainer.appendChild(Card(hello));

import axios from "axios"

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  const cardContainer = document.querySelector(selector) 
  axios
  .get("https://lambda-times-api.herokuapp.com/articles")
  .then(res => {
    
    console.log(res.data);
    // console.log(res.data.articles);
    // console.log(res.data.articles.javascript);

    const data = res.data.articles;
    for(var key in data){
      const obj = data.[key]
      obj.forEach(element => {
        const card = Card(element);
        cardContainer.appendChild(card);
      });
    }
  })
  .catch(err => {
    console.log(err);
  })
}

export { Card, cardAppender }
