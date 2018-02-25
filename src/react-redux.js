import React, { Component } from 'react';
import PropTypes from 'prop-types';



// mapStateTopProps 相当于告知了 Connect 应该如何去 store 里面取数据，然后可以把这个函数的返回结果传给被包装的组件：
// connect 现在是接受一个参数 mapStateToProps，然后返回一个函数，这个返回的函数才是高阶组件。它会接受一个组件作为参数，然后用 Connect 把组件包装以后再返回
export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {

    class Connect extends Component {

        static contextTypes = {
            store: PropTypes.object
        }

        constructor () {
            super()
            this.state = {
                allProps: {}
            }
        }


        componentWillMount () {
            const { store } = this.context;
            this._updateProps();
            store.subscribe(() => this._updateProps())
        }

        _updateProps () {
            const { store } = this.context;
            let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {} // 额外传入 props，让获取数据更加灵活方便
            let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, this.props) : {} // 防止 mapDispatchToProps 没有传入
            this.setState({
                allProps: { // 整合普通的 props 和从 state 生成的 props
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props
                }
            })
        }

        render () {
            return (
                // {...stateProps} 意思是把这个对象里面的属性全部通过 `props` 方式传递进去
                <WrappedComponent { ...this.state.allProps } />
            )
        }

    }

    return Connect;
}




export class Provider extends React.Component {
    static propsTypes = {
        store: PropTypes.object,
        children: PropTypes.any
    }
    static childContextTypes = {
        store: PropTypes.object
    }

    getChildContext () {
        return {
            store: this.props.store
        }
    }

    render () {
        return (
            <div>{this.props.children}</div>
        )
    }
}