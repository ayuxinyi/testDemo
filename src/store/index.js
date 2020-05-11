import Vuex from 'vuex'
import router from '@/router'

export default Vuex.createStore({
  state: {
    page: [
      {
        path: "/",
        name: "first",
        title: "第一个"
      }
    ],
    currentPath: "/"
  },
  mutations: {
    setPage(state, item) {
      let saveIndex;
      let flag = true;
      state.page.forEach((pageItem, index) => {
        if (item.name == pageItem.name) {
          flag = false;
          saveIndex = index
        }
      })
      if (flag) {
        state.page.push(item);
      }
    },
    setCurrent(state, path) {
      state.currentPath = path;
    },
    deletePage(state, path) {
      let newPage = {}
      const isCurrent = state.currentPath === path
      if (isCurrent) {
        const len = state.page.length
        for (let i = 0; i < len; i++) {
          if (state.page[i].path === path) {
            newPage = i < len - 1 ? state.page[i + 1] : state.page[i - 1]
            break
          }
        }
      }
      const index = state.page.findIndex(page => page.path === path)
      if (index >= 0) {
        state.page.splice(index, 1)
      }
      if (isCurrent) {
        router.push(newPage.path)
      }
    }
  },
  actions: {
  },
  modules: {
  }
});
