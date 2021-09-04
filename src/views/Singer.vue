<template>
  <div class="singer" v-loading="!singers.length">
    <IndexList :data="singers" @select="selectSinger"/>
    <router-view v-slot="{ Component }">
      <transition name="slide">
        <component :is="Component" :singer="singer"/>
      </transition>
    </router-view>
  </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import { getSingerList } from '../service/singer'
import IndexList from '../components/base/index-list/IndexList.vue'
import { useRouter } from 'vue-router'
import storage from 'good-storage'
import { SINGER_KEY } from '../assets/js/constant.js'
export default {
  name: 'Singer',
  components: {
    IndexList
  },
  setup() {
    const singers = ref([])
    const singer = ref(null)
    const route = useRouter()
    onBeforeMount(async () => {
      const result = await getSingerList()
      singers.value = result.singers
    })
    const selectSinger = (mSinger) => {
      singer.value = mSinger
      cacheSinger(mSinger)
      route.push({
        path: `/singer/${singer.value.mid}`
      })
    }
    const cacheSinger = (singer) => {
      storage.session.set(SINGER_KEY, singer)
    }
    return {
      singers,
      selectSinger,
      singer
    }
  }
}
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
