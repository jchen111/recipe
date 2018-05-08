import _ from 'lodash';

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const FOOD2FORK_HOST = 'http://food2fork.com';
const FOOD2FORK_BASE_PATH = '/api';
const FOOR2FORK_API_KEY = '2721e48b2f22e684febe44f059c8b7f7';

class Food2ForkService {
  async getRecipesByQuery(query, sort, page) {
    let url = undefined;
    if(query != null) {
      url = `${FOOD2FORK_HOST}${FOOD2FORK_BASE_PATH}/search?key=${FOOR2FORK_API_KEY}&q=${query}&sort=${sort}&page=${page}`;
    }
    else {
      url = `${FOOD2FORK_HOST}${FOOD2FORK_BASE_PATH}/search?key=${FOOR2FORK_API_KEY}&sort=${sort}&page=${page}`;
    }
    const response = await fetch(PROXY_URL + url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`Food2ForkService getRecipesByQuery failed, HTTP status ${response.status}`);
    }

    const data = await response.json();
    let recipes = [];
    data.recipes.map((recipe) => {
      recipes.push({
        recipe_id: recipe.recipe_id,
        image_url: recipe.image_url,
        title: recipe.title,
        source_url: recipe.source_url,
        publisher: recipe.publisher,
        publisher_url: recipe.f2f_url
      });
    })
    return recipes;
  }

  _validateUrl(url = '') {
    return url.startsWith('http') ? url : undefined;
  }
}

export default new Food2ForkService();
