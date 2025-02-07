/*
 * @Descripttion: 
 * @Author: zhangzhiyong
 * @Date: 2021-11-10 19:08:41
 * @LastEditors: zhangzhiyong
 * @LastEditTime: 2021-12-24 16:15:32
 */
import { toMobx,toJS } from '@chaoswise/cw-mobx';
import { 
  getTreeDataService,
  getListDataService,
  getUserInfoService,
  getProjectsService,
  getTagsService
} from '../services';

const model = {
  // 唯一命名空间
  namespace: "ComponentDevelop",
  // 状态
  state: {
    userInfo:{},
    detailShow:false,
    showRecord:false,
    addModalvisible:false,
    editModalvisible:false,
    importModalvisible:false,
    releaseModalVisible:false,
    treeData:[],
    listData:{},
    selectedData:{
      category:'',
      subCategory:''
    },
    searchName:'',
    searchKey:'',
    searchStatus:'all',
    searchProject:undefined,
    searchType:'all',
    viewId:'',
    editData:{},
    projectsData:[],
    tagsData:[],
    developing:false,
    developingData:{},
    total:0,
    curPage:1,
    pageSize:10
  },
  effects: {
    *getUserInfo() {
      const res = yield getUserInfoService();
      if (res && res.data) {
        this.setUserInfo(res.data);
      }
    },
    *getTreeDataFirst() {
      // 请求数据
      const res = yield getTreeDataService();
      if (res && res.data) {
        const data = res.data;
        this.setTreeData(data);
        const first = toJS(data)[0];
        if (first) {
          this.setSelectedData({
            category:first.id,
            subCategory:''
          });
        }
      }
    },
    *getTreeData() {
      // 请求数据
      const res = yield getTreeDataService();
      this.setTreeData(res.data);
    },
    *getProjectsData() {
      const res = yield getProjectsService();
      if (res && res.data) {
        this.setProjectsData(res.data.list);
      }
    },
    *getTagsData() {
      const res = yield getTagsService({type:'component'});
      if (res && res.data) {
        this.setTagsData(res.data);
      }
    },
    *getListData(){
      const curPage = this.curPage;
      const pageSize = this.pageSize;
      const { category,subCategory } = toJS(this.selectedData);
      const searchName = this.searchName;
      const searchKey = this.searchKey;
      const searchStatus = this.searchStatus;
      const searchProject = this.searchProject;
      const searchType = this.searchType;
      const params = {
        name:searchName?searchName:undefined,
        key:searchKey?searchKey:undefined,
        developStatus:searchStatus!=='all'?searchStatus:undefined,
        type:searchType==='all'?undefined:searchType,
        projectId:searchProject,
        category:category,
        subCategory:subCategory===''?undefined:subCategory,
        curPage:curPage,
        pageSize
      };
      const res = yield getListDataService(params);
      this.setListData(res.data);
    }
  },
  reducers: {
    setUserInfo(res){
      this.userInfo = res;
    },
    setDetailShow(res){
      this.detailShow = res;
    },
    setAddModalvisible(res){
      this.addModalvisible = res;
    },
    setEditModalvisible(res){
      this.editModalvisible = res;
    },
    setImportModalvisible(res){
      this.importModalvisible = res;
    },
    setTreeData(res){
      this.treeData = res;
    },
    setListData(res){
      this.listData = res;
    },
    setSelectedData(res){
      this.selectedData = res;
    },
    setSearchName(res){
      this.searchName = res;
    },
    setSearchKey(res){
      this.searchKey = res;
    },
    setSearchStatus(res){
      this.searchStatus = res;
    },
    setSearchProject(res){
      this.searchProject = res;
    },
    setSearchType(res){
      this.searchType = res;
    },
    setViewId(res){
      this.viewId = res;
    },
    setEditData(res){
      this.editData = res;
    },
    setProjectsData(res){
      this.projectsData = res;
    },
    setTagsData(res){
      this.tagsData = res;
    },
    setDeveloping(res){
      this.developing = res;
    },
    setDevelopingData(res){
      this.developingData = res;
    },
    setTotal(res){
      this.total = res;
    },
    setPageSize(res){
      this.pageSize = res;
    },
    setCurPage(res){
      this.curPage = res;
    },
    setReleaseModalVisible(res){
      this.releaseModalVisible = res;
    },
    setShowRecord(res){
      this.showRecord = res;
    }
  }
};

export default toMobx(model);