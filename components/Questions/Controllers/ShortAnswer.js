export default function () {
    return (
        <>
            <label id="mc_instruc" className="font-semibold text-gray-800">Enter response:
            </label>
            <input onPaste={() => console.log('paste detected')} className="mt-2 form-input block sm:py-3 text-sm sm:text-lg w-full transtion-all duration-100" spellCheck="false" placeholder="Start typing..."/>
        </>

    )

}
