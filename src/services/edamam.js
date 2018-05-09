import _ from 'lodash';

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const EDAMAM_HOST = 'https://api.edamam.com';
const EDAMAM_API_KEY = '7ce0e63359fae499b487c7fd42ad84a4';
const EDAMAM_APP_ID = '52ea527e';
const EDAMAM_PAGE_SIZE = 20;

class EdamamService {
  async getRecipesByQuery(query, sort, page) {
    const from = (page - 1) * EDAMAM_PAGE_SIZE;
    const to = page * EDAMAM_PAGE_SIZE;

    const url = `${EDAMAM_HOST}/search?q=${query}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_API_KEY}&from=${from}&to=${to}`;

    const response = await fetch(PROXY_URL + url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`EdamamService getRecipesByQuery failed, HTTP status ${response.status}`);
    }

    const data = await response.json();
    let recipes = [];
    data.hits.map((entry) => {
      recipes.push({
        recipe_id: entry.recipe.uri,
        image_url: entry.recipe.image,
        title: entry.recipe.label,
        source_url: entry.recipe.url,
        publisher: entry.recipe.source,
        publisher_url: entry.recipe.url,
        saved: false
      });
    })
    return recipes;
  }
}

export default new EdamamService();
