<template>
<!--  <div-->
<!--    class="d2-layout-header-aside-group"-->
<!--    :style="styleLayoutMainGroup"-->
<!--    :class="{ grayMode: grayActive }"-->
<!--  >-->
<!--    &lt;!&ndash; 半透明遮罩 &ndash;&gt;-->
<!--&lt;!&ndash;    <div class="d2-layout-header-aside-mask"></div>&ndash;&gt;-->
<!--    &lt;!&ndash; 主体内容 &ndash;&gt;-->
<!--&lt;!&ndash;    <div class="d2-layout-header-aside-content" flex="dir:top">&ndash;&gt;-->
<!--&lt;!&ndash;      &lt;!&ndash; 顶栏 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;      <div&ndash;&gt;-->
<!--&lt;!&ndash;        class="d2-theme-header"&ndash;&gt;-->
<!--&lt;!&ndash;        :style="{ opacity: this.searchActive ? 0.5 : 1 }"&ndash;&gt;-->
<!--&lt;!&ndash;        flex-box="0"&ndash;&gt;-->
<!--&lt;!&ndash;        flex&ndash;&gt;-->
<!--&lt;!&ndash;      >&ndash;&gt;-->
<!--&lt;!&ndash;        <router-link&ndash;&gt;-->
<!--&lt;!&ndash;          to="/index"&ndash;&gt;-->
<!--&lt;!&ndash;          :class="{ 'logo-group': true, 'logo-transition': asideTransition }"&ndash;&gt;-->
<!--&lt;!&ndash;          :style="{ width: asideCollapse ? asideWidthCollapse : asideWidth }"&ndash;&gt;-->
<!--&lt;!&ndash;          flex-box="0"&ndash;&gt;-->
<!--&lt;!&ndash;        >&ndash;&gt;-->
<!--&lt;!&ndash;          <img v-if="asideCollapse" :src="`${$baseUrl}image/theme/logo/logo@single.svg`">&ndash;&gt;-->
<!--&lt;!&ndash;          <img v-else :src="`${$baseUrl}image/theme/logo/logo@line.svg`">&ndash;&gt;-->
<!--&lt;!&ndash;        </router-link>&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="toggle-aside-btn" @click="handleToggleAside" flex-box="0">&ndash;&gt;-->
<!--&lt;!&ndash;          <d2-icon name="bars" />&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;        <d2-menu-header flex-box="1" />&ndash;&gt;-->
<!--&lt;!&ndash;        &lt;!&ndash; 顶栏右侧 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="d2-header-right" flex-box="0">&ndash;&gt;-->
<!--&lt;!&ndash;          &lt;!&ndash; 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          <d2-header-search @click="handleSearchClick" />&ndash;&gt;-->
<!--&lt;!&ndash;          <d2-header-log />&ndash;&gt;-->
<!--&lt;!&ndash;          <d2-header-fullscreen />&ndash;&gt;-->
<!--&lt;!&ndash;          <d2-header-theme />&ndash;&gt;-->
<!--&lt;!&ndash;          <d2-header-size />&ndash;&gt;-->
<!--&lt;!&ndash;          <d2-header-locales />&ndash;&gt;-->
<!--&lt;!&ndash;          &lt;!&ndash; <d2-header-color/> &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          <d2-header-user />&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;      &lt;!&ndash; 下面 主体 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="d2-theme-container" flex-box="1" flex>&ndash;&gt;-->
<!--&lt;!&ndash;        &lt;!&ndash; 主体 侧边栏 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        <div&ndash;&gt;-->
<!--&lt;!&ndash;          flex-box="0"&ndash;&gt;-->
<!--&lt;!&ndash;          ref="aside"&ndash;&gt;-->
<!--&lt;!&ndash;          :class="{&ndash;&gt;-->
<!--&lt;!&ndash;            'd2-theme-container-aside': true,&ndash;&gt;-->
<!--&lt;!&ndash;            'd2-theme-container-transition': asideTransition,&ndash;&gt;-->
<!--&lt;!&ndash;          }"&ndash;&gt;-->
<!--&lt;!&ndash;          :style="{&ndash;&gt;-->
<!--&lt;!&ndash;            width: asideCollapse ? asideWidthCollapse : asideWidth,&ndash;&gt;-->
<!--&lt;!&ndash;            opacity: this.searchActive ? 0.5 : 1,&ndash;&gt;-->
<!--&lt;!&ndash;          }"&ndash;&gt;-->
<!--&lt;!&ndash;        >&ndash;&gt;-->
<!--&lt;!&ndash;          <d2-menu-side />&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;        &lt;!&ndash; 主体 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="d2-theme-container-main" flex-box="1" flex>&ndash;&gt;-->
<!--&lt;!&ndash;          &lt;!&ndash; 搜索 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          <transition name="fade-scale">&ndash;&gt;-->
<!--&lt;!&ndash;            <div v-if="searchActive" class="d2-theme-container-main-layer" flex>&ndash;&gt;-->
<!--&lt;!&ndash;              <d2-panel-search ref="panelSearch" @close="searchPanelClose" />&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;          </transition>&ndash;&gt;-->
<!--&lt;!&ndash;          &lt;!&ndash; 内容 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          <transition name="fade-scale">&ndash;&gt;-->
<!--&lt;!&ndash;            <div&ndash;&gt;-->
<!--&lt;!&ndash;              v-if="!searchActive"&ndash;&gt;-->
<!--&lt;!&ndash;              class="d2-theme-container-main-layer"&ndash;&gt;-->
<!--&lt;!&ndash;              flex="dir:top"&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--&lt;!&ndash;              &lt;!&ndash; tab &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;              <div class="d2-theme-container-main-header" flex-box="0">&ndash;&gt;-->
<!--&lt;!&ndash;                <d2-tabs />&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;              &lt;!&ndash; 页面 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;              <div class="d2-theme-container-main-body" flex-box="1">&ndash;&gt;-->
<!--&lt;!&ndash;                <transition :name="transitionActive ? 'fade-transverse' : ''">&ndash;&gt;-->
<!--&lt;!&ndash;                  <keep-alive :include="keepAlive">&ndash;&gt;-->
<!--&lt;!&ndash;                    <router-view :key="routerViewKey" />&ndash;&gt;-->
<!--&lt;!&ndash;                  </keep-alive>&ndash;&gt;-->
<!--&lt;!&ndash;                </transition>&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;          </transition>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--    <keep-alive :include="keepAlive">-->
<!--      <router-view :key="routerViewKey" />-->
<!--    </keep-alive>-->
<!--  </div>-->
  <div class="layout-background">
    <keep-alive :include="keepAlive">
      <router-view :key="routerViewKey" />
    </keep-alive>
  </div>
</template>

<script>
import d2MenuSide from "./components/menu-side";
import d2MenuHeader from "./components/menu-header";
import d2Tabs from "./components/tabs";
import d2HeaderFullscreen from "./components/header-fullscreen";
import d2HeaderLocales from "./components/header-locales";
import d2HeaderSearch from "./components/header-search";
import d2HeaderSize from "./components/header-size";
import d2HeaderTheme from "./components/header-theme";
import d2HeaderUser from "./components/header-user";
import d2HeaderLog from "./components/header-log";
import d2HeaderColor from "./components/header-color";
import { mapState, mapGetters, mapActions } from "vuex";
import mixinSearch from "./mixins/search";
import bg from "../../assets/img/background.jpeg"

export default {
  name: "d2-layout-header-aside",
  mixins: [mixinSearch],
  components: {
    d2MenuSide,
    d2MenuHeader,
    d2Tabs,
    d2HeaderFullscreen,
    d2HeaderLocales,
    d2HeaderSearch,
    d2HeaderSize,
    d2HeaderTheme,
    d2HeaderUser,
    d2HeaderLog,
    d2HeaderColor,
  },
  data() {
    return {
      // [侧边栏宽度] 正常状态
      asideWidth: "200px",
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: "65px",
    };
  },
  computed: {
    ...mapState("d2admin", {
      keepAlive: (state) => state.page.keepAlive,
      grayActive: (state) => state.gray.active,
      transitionActive: (state) => state.transition.active,
      asideCollapse: (state) => state.menu.asideCollapse,
      asideTransition: (state) => state.menu.asideTransition,
    }),
    ...mapGetters("d2admin", {
      themeActiveSetting: "theme/activeSetting",
    }),
    /**
     * @description 用来实现带参路由的缓存
     */
    routerViewKey() {
      // 默认情况下 key 类似 __transition-n-/foo
      // 这里的字符串操作是为了最终 key 的格式和原来相同 类似 __transition-n-__stamp-time-/foo
      const stamp = this.$route.meta[`__stamp-${this.$route.path}`] || "";
      return `${stamp ? `__stamp-${stamp}-` : ""}${this.$route.path}`;
    },
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup() {
      return this.themeActiveSetting.backgroundImage
        ? {
            backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`,
          }
        : {};
    },
  },
  methods: {
    ...mapActions("d2admin/menu", ["asideCollapseToggle"]),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside() {
      this.asideCollapseToggle();
    },
  },
};
</script>

<style lang="scss">
// 注册主题
@import "~@/assets/style/theme/register.scss";
.layout-background{
  //background: red;
  //background-image: url("../../assets/img/background.jpeg");
}
</style>
