import web3 from '@/SmartContract/web3'
import userData from '@/SmartContract/UserData'
import { useState, useEffect } from "react"

// =========================================================================
function EditContact(props:{ isCreating:boolean, name:string, email:string, phone:string, publickey:string, address:string }) {

  const [inputName,      setInputName ]     = useState(props.name);
  const [inputEmail,     setInputEmail]     = useState(props.email);
  const [inputPhone,     setInputPhone]     = useState(props.phone);
  const [inputPublickey, setInputPublickey] = useState(props.publickey);

  useEffect( () => {
    setInputName(props.name);
    setInputEmail(props.email);
    setInputPhone(props.phone);
    setInputPublickey(props.publickey);
  }, [props]); 

  const [isWorking, setIsWorking] = useState(false);
  const spinnerVisibility = isWorking ? "visible" : "invisible";

  const isChanged = (inputName != props.name ||
                     inputEmail != props.email ||
                     inputPhone != props.phone ||
                     inputPublickey != props.publickey);

  const buttonTitle = isChanged ? "Mentés" : "Mégsem";

  function onCancelClicked() {
    var element = document.getElementById("edit-modal");
    if (element != null) element.classList.add("hidden");
  }

  const Save = async () => {
    if (!isChanged) {
        onCancelClicked();
        return;
    }

    if (inputName == '' || inputEmail == '' || inputPhone == '' || inputPublickey == '') {
        alert("Minden adat kitöltése kötelező!");
        return;
    }

    setIsWorking(true);

    try {
        const accounts = await web3.eth.getAccounts();      
        
        if (props.isCreating) {
            await userData.methods
            .createUser(inputName, inputEmail, inputPhone, inputPublickey)
            .send({ from: accounts[0] });
        }
        else {
            await userData.methods
            .updateUser(props.address, inputName, inputEmail, inputPhone, inputPublickey)
            .send({ from: accounts[0] });
        }
    } catch (err) {
        alert(err.message);
    }

    setIsWorking(false);
    onCancelClicked();
    window.location.reload();
  }

  var title = 'Módosítás';
  var showIcon = 'hidden';
  if (props.isCreating) {
    title = 'Új személy felvétele';
    showIcon = '';
  }
  else {
    title = 'Módosítás';
    showIcon = 'none';
  }

  return (
    <div id="edit-modal"
         tabindex="-1"
         aria-hidden="true"
         className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 p-4 w-full max-w-md max-h-full">
            {/*<!-- Modal content -->*/}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/*<!-- Modal header -->*/}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                     {title}
                    </h3>
                    <button type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onCancelClicked}
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Bezárás</span>
                    </button>
                </div>
                {/*<!-- Modal body -->*/}
                <div className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label for="inputName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Név</label>
                            <input type="text"
                                   name="inputName"
                                   id="inputName"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                   placeholder="név"
                                   required=""
                                   value={inputName}
                                   onChange={e => setInputName(e.target.value)}
                            />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefonszám</label>
                            <input type="text"
                                   name="phone"
                                   id="phone"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                   placeholder="+36 (nn) nnn-nnnn"
                                   required=""
                                   value={inputPhone}
                                   onChange={e => setInputPhone(e.target.value)}
                            />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                            <input type="text"
                                   name="email"
                                   id="email"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                   placeholder="pelda@pelda.hu"
                                   required=""
                                   value={inputEmail}
                                   onChange={e => setInputEmail(e.target.value)}
                            />
                        </div>
                        <div className="col-span-2">
                            <label for="publickey" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Publikus kulcs</label>
                            <textarea id="publickey"
                                      rows="4"
                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      placeholder="publikus kulcs"
                                      value={inputPublickey}
                                      onChange={e => setInputPublickey(e.target.value)}
                               />
                        </div>
                    </div>
                    <button className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={Save}
                    >
                        <svg style={{display: showIcon}} className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"/></svg>
                        {buttonTitle}
                    </button>
                </div>
            </div>
            <div className={spinnerVisibility + " absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 bg-black bg-opacity-80 w-full h-full"}>
                <div className="relative -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 flex flex-col items-center">
                    <div className="w-20">
                    <svg aria-hidden="true" className="w-20 h-15 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                    </div>
                    <br/>
                    <span>Az adatok mentése folyamatban...</span>
                </div>
            </div>
        </div>
    </div> 
  )
}

// =========================================================================
export default EditContact
// =========================================================================
