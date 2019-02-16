import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: []
  },
  mutations: {
    pushArticles: (state, payload) => {
      state.articles = [...state.articles, ...payload]
    }
  },
  actions: {
    getArticles: async ({commit}) => {
      const response = await axios.get('http://localhost:3000/articles')
      commit('pushArticles', response.data)
    }
  },
  getters: {
    articles: state => state.articles
  }
})
