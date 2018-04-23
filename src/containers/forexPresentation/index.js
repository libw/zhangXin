import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { List,InputItem,Button,WingBlank} from 'antd-mobile';
import Header from '../../components/header'

class ForexPresentation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={style.wrap}>
                <Header/>
                <header className={style.header}>
                    <p className={style.htitle}>
                        产品交易
                    </p>
                    <span className={style.description}>
                        外汇交易的特点
                    </span>
                </header>
                <section className={style.content}>
                    <p>
                        外汇交易就是一国货币与另一国货币进行交换。与其他金融市场不同，外汇市场没有具体地点，也没有中央交易所，而是通过银行、企业和个人间的电子网络进行交易。 "外汇交易"是同时买入一对货币组合中的一种货币而卖出另外一种货币。 外汇是以货币兑换形式交易， 例如欧元/美元(EUR/USD)或美元/日元 (USD/JPY)。
                    </p>
                    <p>
                        外汇市场是当下全球规模最庞大且最活跃的金融市场。全球外汇市场日交易量达5.3万亿美元，远超股票与期货市场总和。
                    </p>
                    <p>
                        外汇市场全天候 24 小时运作，全球各地的参与者可随时进入市场进行交易，外汇市场交易活跃，流通性好。高度流通量代表了在任何时候，市场上均存在著买卖双方，以当时的市场价格进行交易并成交。
                    </p>
                    <p>
                        外汇市场不论价格走势上涨或下跌，投资者均可进行双向交易，意即透过买入或放空策略操作，无牛熊市之分的特点，提供所有外汇市场参与者同等的获利机会。
                    </p><p>
                    外汇市场的庞大交易量及资讯传递的公开透明，所有的市场参与者均同步获取市场上的资讯与数据，因此屏除了人为炒作及内线交易的可能性，即便是各国中央银行均不易长期干预市场。因此外汇的交易具有透明、公开、公平的特点。
                    </p><p>
                    保证金交易证金交易（意即杠杆交易）是外汇交易最大的优势之一。保证金交易是运用财务杠杆原理，将资金放大倍数操作。交易者存入一笔保证金 (Margin) 后，可以放大的额度，在外汇市场中，根据货币价格的波动进行买卖，赚取其中的差价利润。
                    </p><p>
                    外汇市场不受景气影响，没有涨跌幅的限制，投资者可根据其 对某种货币未来行情走势的预测，同时进行做多或做空的交易策略，享受交易的灵活性。外汇市场的主要参与者包含全球各国中央银行、商业或投资银行、外汇经纪商、自营商、进出口商、跨国企业、基金公司、投机交易者等等。
                    </p>
                </section>
            </div>
        )

    }


}

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

ForexPresentation = connect(mapStateToProps, mapDispatchToProps)(ForexPresentation)


export default ForexPresentation;