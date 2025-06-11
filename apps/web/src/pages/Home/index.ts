import {connect} from 'react-redux'
import { GET_PROMPTS } from '../../store/actions'
import Home from './Home'
import { State } from '../../store/types'
import { Dispatch } from '@reduxjs/toolkit'

const mapStateToProps = (state: State) => {
  return {prompts: state.prompts}
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getPrompts: () => dispatch(GET_PROMPTS())
  }
  
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)

