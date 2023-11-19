import { useState } from "react"
import web3 from '@/SmartContract/web3'
import userData from '@/SmartContract/UserData'

// =========================================================================
function DeleteConfirm(props:{ admin:boolean, user:{name:string, address:string } }) {

  if (!props.admin) return;
    
  // https://flowbite.com/docs/components/modal/

  const [isWorking, setIsWorking] = useState(false);
  const spinnerVisibility = isWorking ? "visible" : "invisible";

  function onCancelClicked() {
    var element = document.getElementById("delete-modal");
    if (element != null) element.classList.add("hidden");
  }

  const onOkClicked = async () => {
    setIsWorking(true);

    try {
        const accounts = await web3.eth.getAccounts();
        const productItem = await userData.methods
        .deleteUser(props.user.address)
        .send({ from: accounts[0] });
    } catch (err) {
        alert(err.message);
    }

    onCancelClicked()
    setIsWorking(false);
    window.location.reload();
  }

  return (
    <div id="delete-modal" tabindex="-1" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button"
                        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={onCancelClicked}
                >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Bezárás</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Biztosan törölni kívánja?</h3>
                    <p>Név: {props.user.name}</p>
                    <br/>
                    <button onClick={onOkClicked} type="button"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                        Törlés
                    </button>
                    <button onClick={onCancelClicked} type="button"
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                        Mégsem
                    </button>
                </div>
            </div>
            <div className={spinnerVisibility + " absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 bg-black bg-opacity-80 w-full h-full"}>
                <div className="relative -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 flex flex-col items-center">
                    <div className="w-20">
                    <svg aria-hidden="true" className="w-20 h-15 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                    </div>
                    <br/>
                    <span>Adatok törlése folyamatban...</span>
                </div>
            </div>
        </div>
    </div>    
  )
}

// =========================================================================
export default DeleteConfirm
// =========================================================================