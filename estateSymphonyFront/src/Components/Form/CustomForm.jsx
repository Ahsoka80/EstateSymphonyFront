import CustomInput from "./CustomInput"

const CustomForm = ({ inputs }) => {

    return inputs.map((item, index) => {
        return (
            <CustomInput {...item}
                key={index} />
        )
    })
}

export default CustomForm
