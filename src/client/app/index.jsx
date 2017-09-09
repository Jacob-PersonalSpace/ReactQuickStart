import React, { Component } from 'react'
import { render } from 'react-dom'
import Select from 'react-select'
import HotTable from 'react-handsontable'

import 'react-select/dist/react-select.css'

class App extends Component {
    constructor(props) {
        super(props)

        this.selectData = [
            {
                label: '1',
                value: '1',
            },
            {
                label: '2',
                value: '2',
            },
            {
                label: '3',
                value: '3',
            },
        ]

        this.masterData = [
            {
                value: '1',
                label: 'label1',
            },
            {
                value: '2',
                label: 'label2',
            },
            {
                value: '3',
                label: 'label3',
            },
        ]

        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.coverRender = this.coverRender.bind(this)

        this.state = {
            suggestedValue: ''
        }
    }

    coverRender(instance, td, row, col, prop, value, cellProperties) {
        let values

        if (value) {
            let labels = []

            values = value.split('+')

            values.forEach(v => {
                let targetObj = this.masterData.find(obj => obj.value.toString() === v.toString())

                if (targetObj) {
                    labels.push(targetObj.label)
                }
            })

            td.innerHTML = labels.toString()
        }
    }

    handleSelectChange(value) {
        this.setState({
            suggestedValue: value
        })
    }

    render() {
        return (
            <div>
                <p>Hello React!!</p>
                <HotTable
                    ref="hot"
                    root="hot"
                    data={[
                        {
                            "1": {
                                "value": true
                            },
                            "2": {
                                "value": "11"
                            },
                            "3": {
                                "value": "12"
                            },
                            "4": {
                                "value": "1+2"
                            },
                        },
                        {
                            "1": {
                                "value": false
                            },
                            "2": {
                                "value": "14"
                            },
                            "3": {
                                "value": "15"
                            },
                            "4": {
                                "value": "2"
                            },
                        },
                        {
                            "1": {
                                "value": true
                            },
                            "2": {
                                "value": "98"
                            },
                            "3": {
                                "value": "55"
                            },
                            "4": {
                                "value": ""
                            },
                        },
                        {
                            "1": {
                                "value": true
                            },
                            "2": {
                                "value": "98"
                            },
                            "3": {
                                "value": "55"
                            },
                            "4": {
                                "value": null
                            },
                        },
                    ]}
                    colHeaders={[
                        "A",
                        "B",
                        "C",
                        "D",
                    ]}
                    columns={[
                        {
                            "data": "1.value",
                            "type": "checkbox",
                        },
                        {
                            "data": "2.value",
                            "type": "text",
                        },
                        {
                            "data": "3.value",
                            "type": "dropdown",
                            source: ['yellow', 'red']
                        },
                        {
                            "data": "4.value",
                            renderer: this.coverRender
                        },
                    ]}
                    rowHeaders={true}
                    width="600"
                    height="300"
                    stretchH="all"
                />
                <Select
                    ref="select"
                    multi
                    simpleValue
                    delimiter='+'
                    disabled={false}
                    value={this.state.suggestedValue}
                    placeholder="Select ..."
                    valueKey='value'
                    labelKey='label'
                    options={this.selectData}
                    onChange={this.handleSelectChange}
                />
            </div>
        )
    }
}

render(
    <App />,
    document.getElementById('app')
)