<template>
  <div class="maindiv">
    <div class="text-center" v-if="getObjects.length === 0">No more records <button class="btn btn-primary" @click="reload()">click to reload</button> </div>
    <tblRow v-else :row="getObjects" :lev="1" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import tblRow from "./tblRow.vue";
import { TableRowWithId } from "../interfaces";
import { ddlUtils } from "../ddl/ddlUtils";
//import { PropType } from "vue";

@Options({
  components: {tblRow},
  computed:
  {
    getObjects() : TableRowWithId[]
    {
      return this.$store.state.JsonObj;
    }
  }
  ,
  methods: {
    reload()
    {
      window.location.reload();
    }
  }
  ,
  mounted() {
    let that: any = this;
    ddlUtils.retJson("/sample.json").then((data : TableRowWithId[]) => {
      //that.ObjJSON = data;
      that.$store.state.JsonObj = data;
      //console.log(data);
    });
  },
  data() {
    return {
      /*ObjJSON: [] as TableRowWithId[]*/
    };
  },
})
export default class App extends Vue {}
</script>

<style scoped>
 @import "../global.scss";
.maindiv{
  padding: 10px;
  width: 99%;
  margin-left: 1%;
  overflow-x: auto;
}
</style>
