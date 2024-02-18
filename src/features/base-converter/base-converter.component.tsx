'use client'

// react
import React from 'react'
// components
import { InputField, InputConfigType } from '@/components/input-field/input-field.component'
// styles
import styles from '@/features/base-converter/base-converter.module.sass'

type InputDataListType = {
    [key in string]: {
        inputConfig: InputConfigType,
        params: { radix: number, pattern: RegExp },
    }
}

export default () => {

    const [inputDataList, setInputDataList] = React.useState<InputDataListType>({
        binary: {
            inputConfig: { 
                componentId: 'binary',
                type: 'number',
                label: '2 進数',
                placeholder: '10100000',
                helperMessage: '0 桁',
                errorMessage: '入力された値が正しくありません。2進数の形式で入力してください。',
                inputValue: '',
                isError: false,
            },
            params: {
                radix: 2,
                pattern: /^[01]+$/,
            }
        },
        octal: {
            inputConfig: {
                componentId: 'octal',
                type: 'number',
                label: '8 進数',
                placeholder: '240',
                helperMessage: '0 桁',
                errorMessage: '入力された値が正しくありません。8進数の形式で入力してください。',
                inputValue: '',
                isError: false,
            },
            params: {
                radix: 8,
                pattern: /^[0-7]+$/,
            }
        },
        decimal: {
            inputConfig: {
                componentId: 'decimal',
                type: 'number',
                label: '10 進数',
                placeholder: '160',
                helperMessage: '0 桁',
                errorMessage: '入力された値が正しくありません。10進数の形式で入力してください。',
                inputValue: '',
                isError: false,
            },
            params: {
                radix: 10,
                pattern: /^\d+$/,
            }
        },
        hexadecimal: {
            inputConfig: {
                componentId: 'hexadecimal',
                type: 'text',
                label: '16 進数',
                placeholder: 'A0',
                helperMessage: '0 桁',
                errorMessage: '入力された値が正しくありません。16進数の形式で入力してください。',
                inputValue: '',
                isError: false,
            },
            params: {
                radix: 16,
                pattern: /^[0-9A-Fa-f]+$/,
            }
        },
    })

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>, baseType: string): void => {
        const inputValue = event.target.value
        const decimalValue: number = parseInt(inputValue, inputDataList[baseType].params.radix)

        if (inputValue === '') {
            setInputDataList((prevInputDataList) => {
                const tempInputDataList = { ...prevInputDataList }

                Object.keys(tempInputDataList).forEach((baseType) => {
                    tempInputDataList[baseType].inputConfig.inputValue = ''
                    tempInputDataList[baseType].inputConfig.helperMessage = String(tempInputDataList[baseType].inputConfig.inputValue.length) + ' 桁'
                    tempInputDataList[baseType].inputConfig.isError = false
                })
                return tempInputDataList
            })

        } else {
            const isError = ! inputDataList[baseType].params.pattern.test(inputValue) || isNaN(decimalValue)
            if(isError) {
                setInputDataList((prevInputDataList) => ({
                    ...prevInputDataList,
                    [baseType]: {
                        ...prevInputDataList[baseType],
                        inputValue: inputValue,
                        helperMessage: String(inputValue.length) + ' 桁',
                        isError: true,
                    }
                }))

            } else {
                setInputDataList((prevInputDataList) => {
                    const tempInputDataList = { ...prevInputDataList }

                    Object.keys(tempInputDataList).forEach((baseType) => {
                        const baseValue = decimalValue.toString(tempInputDataList[baseType].params.radix)

                        tempInputDataList[baseType].inputConfig.inputValue = baseType === 'hexadecimal' ? baseValue.toUpperCase() : baseValue
                        tempInputDataList[baseType].inputConfig.helperMessage = String(tempInputDataList[baseType].inputConfig.inputValue.length) + ' 桁'
                        tempInputDataList[baseType].inputConfig.isError = false
                    })
                    return tempInputDataList
                })
            }
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLInputElement>, baseType: string): void => {
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>, baseType: string): void => {
    }

    return (
        <div className={styles['container']}>
            <div>
                <h2>進数変換</h2>
            </div>
            <div className={styles['wrapper-main']}>
                {Object.keys(inputDataList).map((baseType) => {
                    const inputData = inputDataList[baseType]
                    return (
                        <InputField
                            key={inputData.inputConfig.componentId}
                            inputConfig={inputData.inputConfig}
                            handleClick={handleClick}
                            handleBlur={handleBlur}
                            handleInput={handleInput}
                        ></InputField>
                    )
                })}
            </div>
        </div>
    )
}
