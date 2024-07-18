import {
	UPDATE_USERID,
	UPDATE_EMPNO,
	UPDATE_YEAR
} from './data'

const state={
	userId:'',
	empNo:'',
	year:''
};


const mutations={
	/*userId*/
	[UPDATE_USERID](state,type){
		state.userId=type;
	},
	/*empNo*/
	[UPDATE_EMPNO](state,type){
		state.empNo=type;
	},
	/*year*/
	[UPDATE_YEAR](state,type){
		state.year=type;
	}
};

const getters={
	userId(state){
		return state.userId;
	},
	empNo(state){
		return state.empNo;
	},
	year(state){
		return state.year;
	}
};

export default{
	state,
	mutations,
	getters
}