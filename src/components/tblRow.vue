<template>
  <div>
    <div v-for="(o,oidx) in row" :key="oidx">
      <div class="container-fluid">
          <div class="row" v-if="o.titvisible === true">
            <div class="col-1 titlecol normalcol fw-bold firstcol">
            </div>
            <div class="col titlecol fw-bold" v-for="(d,didx) in getNameValue(o.data)" :key="didx">
              {{d.fld}}   
            </div>
            <div class="col titlecol fw-bold">
              &nbsp;
            </div>
          </div>

          <div class="row">
            <div class="col-1 clickable normalcol firstcol" @click="o.opened = !o.opened" v-if="getNameValue(o.kids).length > 0">  
              >          
            </div>
            <div v-else class="col-1  normalcol firstcol">  
              &nbsp;  
            </div>
            
            <div class="col normalcol" v-for="(d,didx) in getNameValue(o.data)" :key="didx">
              {{d.val}}
            </div>
            <div class="col normalcol text-end lastcol">
              <div class="delrow" @click="delRow(o.guid)"></div>
            </div>
          </div>
          <template v-if="o.opened === true">
            <div :style="{ 'margin-left' : (lev*30) + 'px' ,  'width': 'calc(100% - ' + lev*30 + 'px)' }" v-for="(d,didx) in getNameValue(o.kids)" :key="didx">
              <b class="text-uppercase">{{d.fld}}</b>
              <tblRow :row="d.val.records" recordsObj="true" :lev="lev+1" />
            </div>
          </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { PropType } from "vue";
import { TableRowWithId, FldVal } from "../interfaces";
import { ddlUtils } from "../ddl/ddlUtils";
@Options({
  props: {
    row: {} as PropType<TableRowWithId[]>,
    lev: 0 as number,
    recordsObj: false as boolean
  },
  methods: {
    delRow(guid : string)
    {
      ddlUtils.delRow(this.$store.state.JsonObj,guid);
    }
    ,
    getNameValue(data: Record<string, string>): FldVal[] {
      let ret: FldVal[] = [];
      Object.keys(data).forEach((k: string) => {
        ret.push({ fld: k, val: data[k] });
      });
      return ret;
    },
  },
})
export default class tblRow extends Vue {
  //
}
</script>

<style scoped lang="scss">
 @import "../global.scss";
.lastcol
{
  position: relative;
  right: 20px;
}
.titlecol
{
  border-bottom: 1px solid;
  border-color: #DADCEE;
  background-color: #F3F3F7;
  text-align: left;
  padding-left: 10px;
}
.normalcol
{
  border-bottom: 1px solid;
  border-color: #DADCEE;
}
.delrow {
  background-repeat: no-repeat;
  background-image: url(../assets/delbut.svg);
  width: 40px;
  height: 40px;
  background-size: 40px 40px;
  cursor: pointer;
  display: inline-block;
}
.clickable
{
  cursor: pointer;
}
.firstcol
{
  width:10px;
}
div
{
  margin : 0;
  padding: 0;
}
</style>
