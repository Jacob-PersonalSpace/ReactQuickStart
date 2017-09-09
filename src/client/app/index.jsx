import React, { Component } from 'react'
import { render } from 'react-dom'
import Select from 'react-select'
import HotTable from 'react-handsontable'

import 'react-select/dist/react-select.css'

class App extends Component {
    constructor(props) {
        super(props)

        this.handsontableData = {
            body: [
                {
                    "1" : {
                        "value" : "1992"
                    },
                    "2" : {
                        "value" : "11"
                    },
                    "3" : {
                        "value" : "12"
                    },
                    "4" : {
                        "value" : "66"
                    },
                },
                {
                    "1" : {
                        "value" : "1993"
                    },
                    "2" : {
                        "value" : "14"
                    },
                    "3" : {
                        "value" : "15"
                    },
                    "4" : {
                        "value" : "55"
                    },
                },
                {
                    "1" : {
                        "value" : "1995"
                    },
                    "2" : {
                        "value" : "98"
                    },
                    "3" : {
                        "value" : "55"
                    },
                    "4" : {
                        "value" : "0"
                    },
                },
            ],
            header: {
                colHeaders: [
                    "A",
                    "B",
                    "C",
                    "D",
                ],
                columns: [
                    {
                        "data" : "1.value",
                        "type" : "text",
                    },
                    {
                        "data" : "2.value",
                        "type" : "text",
                    },
                    {
                        "data" : "3.value",
                        "type" : "text",
                    },
                    {
                        "data" : "4.value",
                        "type" : "text",
                    },
                ],
            },
        }

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

        this.handleSelectChange = this.handleSelectChange.bind(this)

        this.state = {
            suggestedValue: ''
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
                    data={this.handsontableData.body}
                    colHeaders={this.handsontableData.header.colHeaders}
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