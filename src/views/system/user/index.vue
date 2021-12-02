<template>
  <tabMains bgTitle="机场航站楼震动及隔层位移检测系统">
    <d-tab :defaultKey="keyId" tabTitle="用户管理" tabIcon="el-icon-user-solid">
      <d-pane actKey="1" label="角色管理">
        <!--       角色管理 -->
        <div class="main-border">
          <div class="main-border-bg">
            <div style="display: flex;flex-direction: column;width: 100%;height: 100%">
              <!--        顶部搜索-->
              <div style="width: 100%;height: 80px;display: flex;flex-direction: row;align-items: center">
                <div class="user-btn">
                  <el-button plain @click="addAuthFlag">添加角色</el-button>
                </div>
                <div class="user-search">
                  <el-input v-model="inputAuth" class="research" placeholder="请输入 角色名称"></el-input>
                  <div class="user-btn">
                    <el-button round plain>搜索</el-button>
                  </div>
                </div>
              </div>
              <!--            表格数据-->
              <div class="user-mid-tab">
                <div class="user-mid-tab-box">
                  <el-table
                    ref="multipleTableAuth"
                    :data="authList.filter(data => !inputAuth || data.roleName.toLowerCase().includes(inputAuth.toLowerCase()))"
                    style="width: 100%"
                    :row-class-name="tableRowClassName"
                    @selection-change="handleSelectionChangeAuth">
                    <el-table-column
                      prop="roleId"
                      label="ID"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="roleName"
                      label="角色名称"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="roleValue"
                      label="角色参数">
                    </el-table-column>
                    <el-table-column
                      prop="roleParentId"
                      label="上级ID">
                    </el-table-column>
                    <el-table-column
                      prop="createdAt"
                      label="创建日期">
                    </el-table-column>
                    <el-table-column
                      prop="updatedAt"
                      label="修改日期">
                    </el-table-column>
                    <el-table-column
                      label="操作">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="text"
                          @click="checkAuthListBtn(scope.row)">权限详情
                        </el-button>
                        <el-button
                          size="mini"
                          type="text"
                          @click="deleteauth(scope.row)">删除角色
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <!--            底部按钮-->
              <div
                style="width: 100%;height: 80px;display: flex;flex-direction: row;justify-content: flex-end;">
                <!--                <div class="title-btn">批量操作</div>-->
                <!--                <div class="title-btn">批量禁用</div>-->
                <!--                <div class="title-btn" @click="deleteauth">批量移除</div>-->
              </div>
              <!--            新增角色弹窗 -->
              <el-drawer
                title="新增角色"
                :visible.sync="authdialogAdd"
                :before-close="handleClose">
                <div>
                  <el-form :model="authAddList" :rules="authAddListRules" ref="authAddList" label-width="100px"
                           class="demo-ruleForm">
                    <el-form-item label="角色名称" prop="roleName">
                      <el-input v-model="authAddList.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色权限">
                      <el-checkbox-group v-model="authAddList.perms">
                        <el-checkbox
                          v-for="item in authAddListPrem"
                          :label="item.permId"
                          :key="item.permId"
                          name="perms">{{ item.permName }}
                        </el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </el-form>
                </div>
                <div style="position: absolute;bottom: 0;left: 0;margin: 0 auto;width: 100%;">
                  <div style="display: flex;justify-content: space-around;padding: 10px">
                    <el-button @click="resetAddAuth('authAddList')">取 消</el-button>
                    <el-button type="primary" @click="addAuthBtn('authAddList')">添 加</el-button>
                  </div>
                </div>
              </el-drawer>
              <!--              查看、修改 角色权限-->
              <el-drawer
                title="角色权限详情"
                :visible.sync="checkAuth"
                :before-close="handleClose">
                <div>
                  <el-form :model="checkAuthList" ref="checkAuthList" label-width="100px"
                           class="demo-ruleForm">
                    <el-form-item label="角色权限">
                      <el-checkbox-group v-model="checkAuthListTrue">
                        <el-checkbox
                          v-for="item in checkAuthList.list"
                          :label="item.permId"
                          :key="item.permId"
                          name="perms">{{ item.permName }}
                        </el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </el-form>
                </div>
                <div style="position: absolute;bottom: 0;left: 0;margin: 0 auto;width: 100%;">
                  <div style="display: flex;justify-content: space-around;padding: 10px">
                    <el-button @click="resetCheck()">取 消</el-button>
                    <el-button type="primary" @click="checkAuthBtn">修 改</el-button>
                  </div>
                </div>
              </el-drawer>
            </div>
          </div>
        </div>
      </d-pane>
      <d-pane actKey="2" label="用户管理">
        <!--       用户管理 -->
        <div class="main-border">
          <div class="main-border-bg">
            <div style="display: flex;flex-direction: column;width: 100%;height: 100%">
              <!--        顶部搜索-->
              <div style="width: 100%;height: 80px;display: flex;flex-direction: row;align-items: center">
                <div class="user-btn">
                  <el-button plain @click="addUserFlag()">添加用户</el-button>
                </div>
                <div class="user-search">
                  <el-input v-model="inputUser" class="research" placeholder="请输入 姓名"></el-input>
                  <div class="user-btn">
                    <el-button round plain>搜索</el-button>
                  </div>
                </div>
              </div>
              <!--      表格数据   -->
              <div class="user-mid-tab">
                <div class="user-mid-tab-box">
                  <el-table
                    ref="multipleTableUse"
                    :data="userList.filter(data => !inputUser || data.userNickName.toLowerCase().includes(inputUser.toLowerCase()))"
                    style="width: 100%"
                    :row-class-name="tableRowClassName"
                    @selection-change="handleSelectionChangeUser">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      prop="userId"
                      label="ID"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="userName"
                      label="用户名"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="userNickName"
                      label="姓名">
                    </el-table-column>
                    <el-table-column
                      prop="userTel"
                      label="电话">
                    </el-table-column>
                    <el-table-column
                      prop="userEmail"
                      label="邮箱">
                    </el-table-column>
                    <el-table-column
                      label="户启用状态">
                      <template slot-scope="scope">
                        <el-switch
                          on-text="是"
                          off-text="否"
                          on-color="#5B7BFA"
                          off-color="#dadde5"
                          :value="scope.row.userStatus == 1 ? true : false"
                          @change="disableUser(scope.row, scope.$index)"
                        >
                        </el-switch>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="text"
                          @click="handleEdituser(scope.row)">编辑
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <!--            底部按钮-->
              <div
                style="width: 100%;height: 80px;display: flex;flex-direction: row;justify-content: flex-end;">
                <!--                <div class="title-btn">批量操作</div>-->
                <div class="title-btn" @click="disableUser(false,-1)">批量禁用</div>
                <div class="title-btn" @click="enableUser(false,-1)">批量启用</div>
                <div class="title-btn" @click="deleteuser()">批量移除</div>
              </div>
              <!--              新增用户弹窗 -->
              <el-drawer
                title="新增用户"
                :visible.sync="userdialogAdd"
                :before-close="handleClose">
                <div>
                  <el-form :model="userAddList" :rules="userAddListRules" ref="userAddList" label-width="100px"
                           class="demo-ruleForm">
                    <el-form-item label="用户名" prop="userName">
                      <el-input v-model="userAddList.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="userPwd">
                      <el-input v-model="userAddList.userPwd"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="userNickName">
                      <el-input v-model="userAddList.userNickName"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="userTel">
                      <el-input
                        v-model='userAddList.userTel'
                        oninput="value=value.replace(/[^\d]/g,'')"
                        maxLength='11'
                        minLength='11'
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="userEmail">
                      <el-input v-model="userAddList.userEmail"></el-input>
                    </el-form-item>
                    <el-form-item label="工号" prop="userNo">
                      <el-input v-model="userAddList.userNo"></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称" prop="roleId">
                      <el-select v-model="userAddList.roleId" placeholder="请选择 角色名称">
                        <el-option
                          v-for="item in userAuthOption"
                          :key="item.roleId"
                          :label="item.roleName"
                          :value="item.roleId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
                <div style="position: absolute;bottom: 0;left: 0;margin: 0 auto;width: 100%;">
                  <div style="display: flex;justify-content: space-around;padding: 10px">
                    <el-button @click="resetAddUser('userAddList')">取 消</el-button>
                    <el-button type="primary" @click="addUserBtn('userAddList')">添 加</el-button>
                  </div>
                </div>
              </el-drawer>
              <!--              修改用户角色弹窗-->
              <el-drawer
                title="修改用户权限"
                :visible.sync="userdialogChange"
                :before-close="handleClose">
                <div>
                  <el-form :model="userAddListChange" :rules="userAddListChangeRules" ref="userAddListChange"
                           label-width="100px"
                           class="demo-ruleForm">
                    <el-form-item label="角色名称" prop="roleId">
                      <el-select v-model="userAddListChange.roleId" placeholder="请选择 角色名称">
                        <el-option
                          v-for="item in userAuthOption"
                          :key="item.roleId"
                          :label="item.roleName"
                          :value="item.roleId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
                <div style="position: absolute;bottom: 0;left: 0;margin: 0 auto;width: 100%;">
                  <div style="display: flex;justify-content: space-around;padding: 10px">
                    <el-button @click="resetAddUserChange('userAddListChange')">取 消</el-button>
                    <el-button type="primary" @click="addUserChangeBtn('userAddListChange')">添 加</el-button>
                  </div>
                </div>
              </el-drawer>
            </div>
          </div>
        </div>
      </d-pane>
      <d-pane actKey="3" label="权限管理">
        <!--       权限管理 -->
        <div class="main-border">
          <div class="main-border-bg">
            <div style="display: flex;flex-direction: column;width: 100%;height: 100%">
              <!--        顶部搜索-->
              <div style="width: 100%;height: 80px;display: flex;flex-direction: row;align-items: center">
                <!--                <div class="user-btn">-->
                <!--                  <el-button plain @click="addPremFlag">添加权限</el-button>-->
                <!--                </div>-->
                <div class="user-search" style="padding-left: 0">
                  <el-input v-model="inputPerm" class="research" placeholder="请输入 权限名称"></el-input>
                  <div class="user-btn">
                    <el-button round plain>搜索</el-button>
                  </div>
                </div>
              </div>
              <!--            表格数据-->
              <div class="user-mid-tab">
                <div class="user-mid-tab-box2">
                  <el-table
                    ref="multipleTable"
                    :data="permList.filter(data => !inputPerm || data.permName.toLowerCase().includes(inputPerm.toLowerCase()))"
                    style="width: 100%"
                    :row-class-name="tableRowClassName"
                    @selection-change="handleSelectionChangePrem">
                    <el-table-column
                      prop="permId"
                      label="ID"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="permName"
                      label="权限名称"
                      width="180">
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <!--            底部按钮-->
              <!--              <div-->
              <!--                style="width: 100%;height: 80px;display: flex;flex-direction: row;justify-content: flex-end;">-->
              <!--                <div class="title-btn">批量移除</div>-->
              <!--              </div>-->
              <!--              弹窗-->
              <el-drawer
                title="新增权限"
                :visible.sync="permdialogAdd"
                :before-close="handleClose">
                <div>
                  <el-form :model="permAddList" :rules="permAddListRules" ref="userAddListChange"
                           label-width="100px"
                           class="demo-ruleForm">
                    <el-form-item label="用户名" prop="userName">
                      <el-input v-model="permAddList.userName"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div style="position: absolute;bottom: 0;left: 0;margin: 0 auto;width: 100%;">
                  <div style="display: flex;justify-content: space-around;padding: 10px">
                    <el-button @click="resetAddPrem('permdialogAdd')">取 消</el-button>
                    <el-button type="primary" @click="addPremBtn('permdialogAdd')">添 加</el-button>
                  </div>
                </div>
              </el-drawer>
            </div>
          </div>
        </div>
      </d-pane>
      <d-pane actKey="4" label="日志信息">
        <!--       日志信息 -->
        <div class="main-border">
          <div class="main-border-bg">
            <div style="display: flex;flex-direction: column;width: 100%;height: 100%">
              <!--        顶部搜索-->
              <div
                style="width: 100%;height: 80px;display: flex;flex-direction: row;align-items: center;justify-content: space-between">
                <div class="user-btn">
                  <el-button plain
                             class="title-btn-left"
                             @click="logData">
                    报警日志

                  </el-button>
                  <!--                  <el-button @click="doubleLog(1)" :class="[activeKeyBtn == 1? 'active-btn' : 'btn']" plain-->
                  <!--                             class="title-btn-left" key="1">-->
                  <!--                    用户日志-->
                  <!--                  </el-button>-->
                  <!--                  <el-button @click="doubleLog(2)" :class="[activeKeyBtn == 2? 'active-btn' : 'btn']" plain-->
                  <!--                             class="title-btn-left" key="2">-->
                  <!--                    报警日志-->
                  <!--                  </el-button>-->
                </div>
                <div class="user-search">
                  <el-input v-model="inputLog" class="research" placeholder="请输入 日志内容"></el-input>
                  <div class="user-btn">
                    <el-button round plain>搜索</el-button>
                  </div>
                </div>
              </div>
              <!--            表格数据-->
              <div class="user-mid-tab">
                <div class="user-mid-tab-box">
                  <!--:data="logList.filter(data => !inputLog || data.message.toLowerCase().includes(inputLog.toLowerCase()))"-->
                  <el-table
                    :data="logList"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
<!--                    <el-table-column-->
<!--                      prop="host"-->
<!--                      label="主机"-->
<!--                      width="180">-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                      prop="instant.epochSecond"-->
<!--                      label="时间"-->
<!--                      width="180">-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                      prop="port"-->
<!--                      label="端口"-->
<!--                      width="180">-->
<!--                    </el-table-column>-->
                    <el-table-column
                      prop="timestamp"
                      label="时间"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      prop="level"
                      label="日志等级"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      label="日志类型"
                      width="200">
                      <template slot-scope="scope">
                        {{ scope.row.level === 'ACTION_LEVEL' ? '操作日志' : '系统日志' }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="loggerName"
                      label="日志名称"
                      width="400">
                    </el-table-column>
                    <el-table-column
                      prop="message"
                      label="内容">
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <!--            底部按钮-->
              <div
                style="width: 100%;height: 80px;display: flex;flex-direction: row;justify-content: flex-end;">
                <div class="title-btn" @click="clearLog">清空日志</div>
              </div>
            </div>
          </div>
        </div>
      </d-pane>
    </d-tab>
  </tabMains>
</template>

<script>
import tabMains from '../../../components/DTabs'
import DTab from '../../../components/DTabs/info'
import DPane from '../../../components/DTabs/pane'
import DBg from '@/components/DBackground'
import { postUserList, addUser, postDelUser, postChangeUser } from '../../../../src/api/request'

export default {
  name: 'index',
  data () {
    return {
      // 角色
      inputAuth: '',
      authList: [], // 列表展示数据
      authdialogAdd: false,
      authAddList: {  // 新增角色
        'roleName': '',
        'perms': []
      },
      authAddListRules: {
        roleName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ]
      },
      multipleTableAuth: [],
      authAddListPrem: [],
      // 查看角色权限
      checkAuth: false,
      checkAuthList: {},
      checkAuthListTrue: [],
      // 保存的 roleId 用于修改 角色权限
      roleId: '',
      // 用户
      userdialogChange: false,// 修改弹窗 标识
      useId: '',// 修改 角色的 useid
      userAddListChange: {
        'userName': '',
        'roleId': ''
      }, // 修改用户角色 表单
      userAddListChangeRules: {
        roleId: [
          {
            required: true,
            message: '请选择角色名称',
            trigger: 'change'
          }
        ],
      }, // 修改用户角色 规则
      userList: [], // 列表展示数据
      userdialogAdd: false,  // 增加用户弹窗 标识
      userAddList: {
        'userName': '', // 用户名
        'userPwd': '', // 密码（明文 后期更换加密规则）
        'userNickName': '', // 昵称
        'userTel': '', // 手机号
        'userEmail': '', // 邮箱
        'userNo': '', // 工号
        'userType': 1, // 用户类型 预留字段
        'roleId': '', // 角色ID
      }, // 增加用户 表单
      userAddListRules: {
        userName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        userPwd: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        userNickName: [
          {
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }
        ],
        userTel: [
          {
            required: true,
            message: '请输入电话',
            trigger: 'blur'
          },
          {
            min: 11,
            max: 11,
            message: '电话长度不符',
            trigger: 'blur'
          }
        ],
        roleId: [
          {
            required: true,
            message: '请选择角色名称',
            trigger: 'change'
          }
        ],
      },   // 用户添加规则
      userAuthOption: [],    // 角色多选
      multipleTableUser: [],  // 多选
      inputUser: '', // 搜索
      // 权限管理
      inputPerm: '', // 搜索
      permList: [],  // 列表数据展示
      permdialogAdd: false,  // 增加权限弹窗 标识
      permAddList: {
        'userName': '', // 用户名
        'userPwd': '', // 密码（明文 后期更换加密规则）
        'userNickName': '', // 昵称
        'userTel': '', // 手机号
        'userEmail': '', // 邮箱
        'userNo': '', // 工号
        'userType': 1, // 用户类型 预留字段
        'roleId': '', // 角色ID
      }, // 增加权限 表单
      permAddListRules: {
        userName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        userPwd: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        userNickName: [
          {
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }
        ],
        userTel: [
          {
            required: true,
            message: '请输入电话',
            trigger: 'blur'
          }
        ],
        roleId: [
          {
            required: true,
            message: '请选择角色名称',
            trigger: 'change'
          }
        ],
      },   // 用户添加规则
      multipleTablePrem: [],
      // 日志信息
      logList: [],
      inputLog: '',
      // 通用
      input: '',
      tableData1: [],
      multipleSelection1: [],
      keyId: '1',
      activeKeyBtn: '1',
    }
  },
  components: {
    tabMains,
    DTab,
    DPane,
    DBg
  },
  beforeMount () {
    this.reGetList()
    this.keyId = this.$route.query.id ? this.$route.query.id : 1
  },
  methods: {
    /* 角色 */
    // 查看角色 拥有的权限
    checkAuthListBtn (row) {
      this.checkAuth = true
      this.roleId = row.roleId
      let dataJSon = {
        'roleId': row.roleId //角色ID
      }
      // checkAuthList
      // 全部的权限
      postUserList('/auth/perm/list').then(res => {
        this.checkAuthList = res.data
        postUserList('/auth/role/perm/list', dataJSon).then(res => {
          let data = res.data.list
          for (let i = 0; i < data.length; i++) {
            this.checkAuthListTrue.push(data[i].permId)
          }
        })
      })
      // 以及被选中的

    },
    // 关闭 角色权限弹窗
    resetCheck () {
      // 清空 选中的权限
      this.checkAuthListTrue = []
      this.checkAuth = false
    },
    // 重置角色权限
    checkAuthBtn () {
      let dataJson = {
        'roleId': this.roleId, //角色ID
        'perms': this.checkAuthListTrue //权限ID
      }
      postUserList('/auth/role/perm/reset', dataJson).then(res => {
        // console.log(res);
        this.checkAuthListTrue = []
        this.checkAuth = false
        this.reGetList()
        this.$notify({
          title: '通知',
          message: '成功修改权限',
          type: 'success'
        })
      })
    },
    // 删除角色
    deleteauth (val) {
      this.$confirm('此删除操作不可逆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let dataJson = {
          'roleId': val.roleId
        }
        this.delUser('/auth/role/del', dataJson)

      })

    },
    // 取消增加 角色
    resetAddAuth (formName) {
      this.authdialogAdd = false
      this.$refs[formName].resetFields()
    },
    // 确定增加 角色
    addAuthBtn (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let dataJson = this.authAddList
          this.addUser('/auth/role/add', dataJson)
          this.authdialogAdd = false
          this.authAddList = {  // 新增角色
            'roleName': '',
            'perms': []
          }
        } else {
          return false
        }
      })
      // this.resetAddAuth(formName)
    },
    //
    addAuthFlag () {
      this.authdialogAdd = true
    },

    /* 用户 */
    // 关闭 修改弹窗
    resetAddUserChange (formName) {
      this.userdialogChange = false
      this.$refs[formName].resetFields()
    },
    // 确定 修改
    addUserChangeBtn (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let dataJson = {
            'userId': this.useId,
            'roleId': this.userAddListChange.roleId
          }
          this.changeUser('/user/role/replacement', dataJson)
          this.userdialogChange = false
          this.userAddListChange = {
            'userId': '',
            'roleId': ''
          }
        } else {
          return false
        }
      })
    },
    // 打开 修改弹窗
    handleEdituser (row) {
      this.useId = row.userId
      this.userdialogChange = true
      this.userAddListChange = {}
    },
    // 关闭 增加弹窗
    resetAddUser (formName) {
      this.userdialogAdd = false
      this.$refs[formName].resetFields()
    },
    // 确定 新增
    addUserBtn (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let dataJson = this.userAddList
          this.addUser('/user/add', dataJson)
          this.userdialogAdd = false
          this.userAddList = {
            'userName': '', // 用户名
            'userPwd': '', // 密码（明文 后期更换加密规则）
            'userNickName': '', // 昵称
            'userTel': '', // 手机号
            'userEmail': '', // 邮箱
            'userNo': '', // 工号
            'userType': 1, // 用户类型 预留字段
            'roleId': '', // 角色ID
          }
        } else {
          return false
        }
      })
    },
    // 打开 增加弹窗
    addUserFlag () {
      this.userdialogAdd = true
    },
    //删除用户
    deleteuser () {
      this.$confirm('此删除操作不可逆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = this.multipleTableUser
        if (data.length > 1) { // 多个删除
          let arr = []
          for (let i = 0; i < data.length; i++) {
            arr.push(data[i].userId)
          }
          let dataJson = {
            'userIdList': arr
          }
          this.delUser('/auth/del/list', dataJson)
        } else if (data.length === 0) {
          this.$notify.info({
            title: '提示',
            message: '请至少选择一条数据'
          })
        } else {
          let dataJson = {
            'userId': data[0].userId
          }
          this.delUser('/user/del', dataJson)
        }
      })
    },
    // 禁用/ 启用用户
    disableUser (val, index) {
      let data = this.multipleTableUser
      if (data.length > 0) { // 多条禁用
        let arr = []
        for (let i = 0; i < data.length; i++) {
          arr.push(data[i].userId)
        }
        let dataJson = {
          'userIdList': arr
        }
        this.disUserList('/user/disable', dataJson, '禁用')
      } else if (index > -1 || data.length === 1) { // 单条
        let arr = []
        arr.push(val.userId)
        let dataJson = {
          'userIdList': arr
        }
        if (val.userStatus === '1') { // 禁用
          this.disUserList('/user/disable', dataJson, '禁用')
        } else { // 启用
          this.disUserList('/user/enable', dataJson, '启用')
        }
      } else {
        this.$notify.info({
          title: '提示',
          message: '请至少选择一条数据'
        })
      }

    },
    enableUser (val, index) {
      let data = this.multipleTableUser
      if (data.length > 0) {
        let arr = []
        for (let i = 0; i < data.length; i++) {
          arr.push(data[i].userId)
        }
        let dataJson = {
          'userIdList': arr
        }
        this.disUserList('/user/enable', dataJson, '启用')
      } else {
        this.$notify.info({
          title: '提示',
          message: '请至少选择一条数据'
        })
      }
    },
    /* 权限 */
    // 关闭 增加弹窗
    resetAddPrem (formName) {
      this.permdialogAdd = false
      this.$refs[formName].resetFields()
    },
    // 确定新增
    addPremBtn (formName) {

    },
    // 打开 增加弹窗
    addPremFlag () {
      this.permdialogAdd = true
    },

    /*日志*/
    clearLog () {
      this.$confirm('此删除操作不可逆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delUserList('/common/log/system/clear')
      })
    },
    //报警日志
    logData () {
      let dataJSon = {
        'pageSize': 10,
        'pageNo': 1
      }
      postUserList('/common/log/data', dataJSon).then(res => {
      //  console.log(res)
        let dataJSon1 = {
          'pageSize': res.data.systemLog.pageSize,
          'pageNo': 1
        }
        // 再次全部获取
        postUserList('/common/log/data', dataJSon1).then(res => {
          for (let i = 0; i < res.data.systemLog.list.length; i++) {
            // res.data.dataLog.logData[i].instant.epochSecond = this.formatDate(res.data.dataLog.logData[i].instant.epochSecond)
          }
          this.logList = res.data.systemLog.list

        })
      })
    },
    // 勾选操作数据
    handleSelectionChangeUser (val) {
      this.multipleTableUser = val
    },
    handleSelectionChangeAuth (val) {
      this.multipleTableAuth = val
    },
    handleSelectionChangePrem (val) {
      this.multipleTablePrem = val
    },
    /* 通用方法 */
    // 批量禁用
    disUserList (url, data, title) {
      postChangeUser(url, data).then(res => {
        this.$notify({
          title: '通知',
          message: '成功' + title + '用户数据',
          type: 'success'
        })
        this.reGetList()
      })
    },
    // 禁用单条数据
    disUser (url, data) {
    },
    // 批量删除
    delUserList (url, data) {
      postDelUser(url, data).then(res => {
        this.$notify({
          title: '通知',
          message: '成功删除数据',
          type: 'success'
        })
        this.reGetList()
      })
    },
    // 删除单条数据
    delUser (url, data) {
      postDelUser(url, data).then(res => {
        this.$notify({
          title: '通知',
          message: '成功删除数据',
          type: 'success'
        })
        this.reGetList()
      })

    },
    // 增加单条数据
    addUser (url, data) {
      addUser(url, data).then(res => {
        this.$notify({
          title: '通知',
          message: '成功添加数据',
          type: 'success'
        })
        this.reGetList()
      })
    },
    changeUser (url, data) {
      postChangeUser(url, data).then(res => {
        this.$notify({
          title: '通知',
          message: '成功修改数据',
          type: 'success'
        })
        this.reGetList()
      })
    },
    // 重新获取
    reGetList () {
      this.infoAuth()
      this.infoUser()
      this.infoPerm()
      this.infoLog()
    },
    // 获取角色数据
    infoAuth () {
      postUserList('/auth/role/list').then(res => {
        let data = res.data.list
        for (let i = 0; i < data.length; i++) {
          res.data.list[i].updatedAt = data[i].updatedAt.split('T')[0]
          res.data.list[i].createdAt = data[i].createdAt.split('T')[0]
        }
        this.authList = res.data.list
        this.userAuthOption = res.data.list
      })
    },
    // 获取用户数据
    infoUser () {
      postUserList('/user/list').then(res => {
        this.userList = res.data.list
      })
    },
    // 获取权限数据
    infoPerm () {
      postUserList('/auth/perm/list').then(res => {
        this.permList = res.data.list
        this.authAddListPrem = res.data.list
      })
    },
    // 时间戳转换
    formatDate (value) {
      return new Date(parseInt(value) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')
    },
    // 获取日志数据
    infoLog () {
      let dataJSon = {
        'pageSize': 10,
        'pageNo': 1
      }
      postUserList('/common/log/system', dataJSon).then(res => {
       // console.log(res)
        let dataJSon1 = {
          'pageSize': res.data.systemLog.pageSize,
          'pageNo': 1
        }
        // 再次全部获取
        postUserList('/common/log/system', dataJSon1).then(res => {
          for (let i = 0; i < res.data.systemLog.list.length; i++) {
            // res.data.systemLog.list[i].timestamp = this.formatDate(res.data.systemLog.logData[i].timestamp)
          }
          this.logList = res.data.systemLog.list
         // console.log(this.logList)
          // console.log(this.logList);
        })
      })
    },
    // 关闭抽屉弹窗
    handleClose (done) {
      done()
    },
    // 默认
    handleSelectionChange1 (val) {
      this.multipleSelection1 = val
    },
    // 表格背景色
    tableRowClassName ({
      row,
      rowIndex
    }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
      return ''
    },
  }
}
</script>

<style scoped>
.active-btn {
  background: #233f5b !important;
  color: #63acc1 !important;
}

.btn {
  color: #c4f7ff !important;
}

.el-dialog__wrapper >>> .el-dialog {
  padding: 20px 20px 40px;
}

/*表格外部样式*/
.user-mid-tab {
  flex: 1;
  width: 100%;
  overflow: scroll;
  background: url("../../../assets/img/search-right.png") no-repeat;
  background-size: 100% 100%;
  padding: 10px;
}

.user-mid-tab::-webkit-scrollbar {
  display: none;
}

.user-mid-tab-box {
  width: 100%;
  /*background: red;*/
  height: 530px;
  overflow: scroll;
}

.user-mid-tab-box2 {
  width: 100%;
  /*background: red;*/
  height: 605px;
  overflow: scroll;
}

.user-mid-tab-box::-webkit-scrollbar {
  display: none;
}

.user-mid-tab-box2::-webkit-scrollbar {
  display: none;
}

/*底部按钮*/
.title-btn {
  background: url('../../../assets/img/title-bg.png') no-repeat;
  background-size: 100% 100%;
  height: 35px;
  width: 100px;
  line-height: 35px;
  text-align: center;
  color: #e1f3ff;
  /*position: absolute;*/
  font-size: 12px;
  cursor: pointer;
  margin: 20px 10px;
}

.el-table >>> .el-table__header {
  background-color: #0e2047 !important;
}

.el-table >>> .warning-row {
  background: #1a3f5e !important;
}

.el-table >>> .success-row {
  background: #0e2047 !important;
}

.el-table >>> .cell {
  color: #62acc2;
}

/*标题*/
.user-btn {
  padding-left: 20px;
}

/*搜索*/
.user-search {
  display: flex;
  flex-direction: row;
  padding-left: 200px;
}

.user-search >>> .el-input__inner {
  border-radius: 15px;
  width: 400px;
}

/*按钮样式*/
.user-btn >>> .el-button {
  background: transparent;
  color: white;
}

.user-btn >>> .title-btn-left {
  margin: 0;
  border-radius: 0;
}

/*主体*/
.main-border {
  margin-top: -180px;
  width: 85vw;
  height: 100vh;
  /*margin: 0 auto;*/
}

.main-border-bg {
  /*background: url('../../../assets/img/search-right.png') no-repeat;*/
  /*background-size: 100% 100%;*/
  height: 100%;
}

.el-input >>> .el-input__inner {
  color: black !important;
}

.el-select >>> .el-input__inner {
  color: black !important;
}

.el-form-item >>> .el-form-item__label {
  color: #2a2d2e !important;
}

.research >>> .el-input__inner {
  color: #EEEEEE !important;
}
</style>
<style>
.el-table th, .el-table tr {
  background-color: transparent;
}
</style>
