/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
// import '@/components/fund/manager/view.scss'
//
// import '@/pages/fund/diagnose/view.scss'
// import '@/pages/fund/info/view.scss'
// import '@/pages/fund/filter/view.scss'
// import '@/pages/fund/list/view.scss'
//
// import '@/pages/combination/addFromFavor/view.scss'



export default class App extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  state = {}

  constructor(props, context) {
    super(props)
  }

  componentDidMount() {
  }


  render() {
    return (<div className="page">
      {this.props.children}
    </div>)
  }
}


