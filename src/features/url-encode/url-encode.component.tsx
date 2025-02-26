'use client'

// react
import React from 'react'
// components
import { Textarea, TextareaConfigType } from '@/components/textarea/textarea.component'
// @mui
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
// styles
import styles from '@/features/url-encode/url-encode.module.sass'

type TextareaDataListType = {
    [key in string]: {
        textareaConfig: TextareaConfigType,
        params: { },
    }
}

export default () => {

    const [checkedToggle, setCheckedToggle] = React.useState('encord')

    const [textareaDataList, setTextareaDataList] = React.useState<TextareaDataListType>({
        input: {
            textareaConfig: { 
                componentId: 'input',
                label: '変換するデータを入力',
                placeholder: '',
                helperMessage: '',
                errorMessage: '',
                inputValue: '',
                isDisabled: false,
                isError: false,
            },
            params: {
            }
        },
        output: {
            textareaConfig: {
                componentId: 'output',
                label: '変換後のデータ',
                placeholder: '',
                helperMessage: '',
                errorMessage: '',
                inputValue: '',
                isDisabled: true,
                isError: false,
            },
            params: {
            }
        },
    })

    const urlEncordOrDecord = (value: string, selectedCheckedToggle: string) => {
        if (selectedCheckedToggle === 'encord') {
            return encodeURIComponent(value)
        } else {
            return decodeURIComponent(value)
        }
    }

    /**
     * トグルボタン
     * @event
     */
    const handleChangeToggleButton = (event: React.MouseEvent<HTMLElement>, selectedCheckedToggle: string) => {
        setCheckedToggle(selectedCheckedToggle)

        const result: string = urlEncordOrDecord(textareaDataList.input.textareaConfig.inputValue, selectedCheckedToggle)
        setTextareaDataList(prevTextareaDataList => ({
            ...prevTextareaDataList,
            output: {
                ...prevTextareaDataList.output,
                textareaConfig: {
                    ...prevTextareaDataList.output.textareaConfig,
                    inputValue: result,
                }
            }
        }))

    }

    /**
     * テキストエリア
     * @event
     */
    const handleInputTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const elemTextarea = event.currentTarget

        const result: string = urlEncordOrDecord(elemTextarea.value, checkedToggle)
        setTextareaDataList(prevTextareaDataList => ({
            ...prevTextareaDataList,
            input: {
                ...prevTextareaDataList.input,
                textareaConfig: {
                    ...prevTextareaDataList.input.textareaConfig,
                    inputValue: elemTextarea.value,
                }
            },
            output: {
                ...prevTextareaDataList.output,
                textareaConfig: {
                    ...prevTextareaDataList.output.textareaConfig,
                    inputValue: result,
                }
            }
        }))
    }

    const handleClickTextarea = (event: React.MouseEvent<HTMLTextAreaElement>): void => {
    }

    const handleBlurTextarea = (event: React.FocusEvent<HTMLTextAreaElement>): void => {
    }

    return (
        <div className={styles['container']}>
            <div>
                <h2 className={styles['feature-header']}>URL エンコード・デコード</h2>
            </div>
            <div className={styles['main-wrapper']}>
                <ToggleButtonGroup
                    color={'info'}
                    value={checkedToggle}
                    exclusive
                onChange={handleChangeToggleButton}>
                    <ToggleButton value='encord'>エンコード</ToggleButton>
                    <ToggleButton value="decord">デコード</ToggleButton>
                </ToggleButtonGroup>
                <Textarea
                    key={textareaDataList.input.textareaConfig.componentId}
                    textareaConfig={textareaDataList.input.textareaConfig}
                    handleClick={handleClickTextarea}
                    handleBlur={handleBlurTextarea}
                    handleInput={handleInputTextarea}
                ></Textarea>
                <Textarea
                    key={textareaDataList.output.textareaConfig.componentId}
                    textareaConfig={textareaDataList.output.textareaConfig}
                    handleClick={handleClickTextarea}
                    handleBlur={handleBlurTextarea}
                    handleInput={handleInputTextarea}
                ></Textarea>
            </div>
        </div>
    )
}
