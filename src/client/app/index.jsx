import React, { Component } from 'react'
import { render, findDOMNode } from 'react-dom'
import Select from 'react-select'
import HotTable from 'react-handsontable'
import Handsontable from 'handsontable'

import 'react-select/dist/react-select.css'
import '../css/handsontable.less'

class App extends Component {
    constructor(props) {
        super(props)

        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.onSelectBlur = this.onSelectBlur.bind(this)
        this.coverRender = this.coverRender.bind(this)
        this.afterBeginEditing = this.afterBeginEditing.bind(this)

        this.state = {
            selectedCellValue: '',
            editingPos: {
                row: '',
                col: '',
            },
            masterName: '',
            masterData1: [
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
            ],
            masterData2: [
                {
                    value: '4',
                    label: 'label4',
                },
                {
                    value: '5',
                    label: 'label5',
                },
                {
                    value: '6',
                    label: 'label6',
                },
            ],
            fileContent: {
                content: [
                    {
                        body: [
                            {
                                "1": {
                                    "value": true
                                },
                                "2": {
                                    "value": "11"
                                },
                                "3": {
                                    "value": "4+6+5"
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
                                    "value": null
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
                                    "value": ""
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
                                    "value": "4"
                                },
                                "4": {
                                    "value": null
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
                                    "data": "1.value",
                                    "type": "checkbox",
                                },
                                {
                                    "data": "2.value",
                                    "type": "text",
                                },
                                {
                                    "data": "3.value",
                                    'renderer': this.coverRender,
                                },
                                {
                                    "data": "4.value",
                                    'renderer': this.coverRender,
                                },
                            ]
                        },
                    },
                ],
            },
        }
    }

    coverRender(instance, td, row, col, prop, value, cellProperties) {
        let values

        if (value) {
            let labels = []

            values = value.split('+')

            values.forEach(v => {
                let masterData = col === 2 ? this.state.masterData2 : this.state.masterData1
                let targetObj = masterData.find(obj => obj.value.toString() === v.toString())

                if (targetObj) {
                    labels.push(targetObj.label)
                }
            })

            td.innerHTML = labels.toString()
        }
        else {
            td.innerHTML = ''
        }
    }

    handleSelectChange(value) {
        this.setState({
            selectedCellValue: value
        })
    }

    afterBeginEditing(row, column) {
        if (column === 3 || column === 2) {
            let TD = this.refs.hot.hotInstance.getCell(row, column)
            let cellValue = this.refs.hot.hotInstance.getSourceDataAtCell(row, column)
            this.setState({
                selectedCellValue: cellValue,
                masterName: column === 2 ? 'masterData2' : 'masterData1'
            })
            console.log('cellValue', cellValue)

            if (TD) {
                this.setState({
                    editingPos: {
                        row: row,
                        col: column,
                    }
                })

                let cellAbsolutePos = TD.getBoundingClientRect()

                this.refs.hot.hotInstance.destroyEditor(false)

                this._selectContainer.style.visibility = 'visible'
                this._selectContainer.style.left = cellAbsolutePos.left.toString() + 'px'
                this._selectContainer.style.top = (cellAbsolutePos.top + cellAbsolutePos.height).toString() + 'px'
                this._selectContainer.style.width = TD.offsetWidth.toString() + 'px'


                // this._select.focusOption(this.state.masterData2)
                this._select.focus()
            }

            return false
        }
    }

    onSelectBlur() {
        console.log('selectbox value', this._select.props.value)

        this._selectContainer.style.visibility = 'hidden'

        let newFileContent = this.state.fileContent

        let columnId = newFileContent.content[0].header.columns[this.state.editingPos.col].data.split('.')[0]

        newFileContent.content[0].body[this.state.editingPos.row][columnId].value = this._select.props.value ? this._select.props.value : null

        this.setState({
            fileContent: newFileContent
        })
    }

    render() {
        return (
            <div>
                <p>Hello React!!</p>
                <HotTable
                    ref="hot"
                    root="hot"
                    data={this.state.fileContent.content[0].body}
                    colHeaders={this.state.fileContent.content[0].header.colHeaders}
                    columns={this.state.fileContent.content[0].header.columns}
                    rowHeaders={true}
                    width="600"
                    height="300"
                    stretchH="all"
                    settings={{
                        afterBeginEditing: (row, column) => this.afterBeginEditing(row, column),
                    }}
                />
                <div className='selectContainer' style={{ visibility: 'hidden' }} ref={(ref) => this._selectContainer = ref}>
                    <Select
                        ref={(ref) => this._select = ref}
                        multi
                        simpleValue
                        delimiter='+'
                        disabled={false}
                        value={this.state.selectedCellValue}
                        placeholder="Select ..."
                        valueKey='value'
                        labelKey='label'
                        options={this.state[this.state.masterName]}
                        onChange={this.handleSelectChange}
                        onBlur={this.onSelectBlur}
                    />
                </div>
            </div>
        )
    }
}

render(
    <App />,
    document.getElementById('app')
)