const { Web3 } = require('web3')
import { useState, useEffect, Fragment } from "react"
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Table, Button, Icon, Card } from 'semantic-ui-react'
import AdminView from "@/components/adminView"
import RestrictedView from "@/components/restrictedView"

import web3 from '@/SmartContract/web3'
import userData from '@/SmartContract/UserData'

import EditContact from "@/components/EditContact"
import DeleteConfirm from "@/components/DeleteConfirm"

const tableWidth = "5"; // oszlopok szama

// =========================================================================
function NewIdentity_old(props:{admin:boolean}) {

  if (!props.admin) return;

  const [identity, setIdentity] = useState({name:'', email:'', phone:'', pubKey:''})

  const Save = async () => {

    if (identity.name == '' || identity.email == '' || identity.phone == '' || identity.pubKey == '') {
      return;
    }

    const accounts = await web3.eth.getAccounts();      
    await userData.methods
      .createUser(identity.name, identity.email, identity.phone, identity.pubKey)
      .send({ from: accounts[0] });

    setIdentity({name:'', email:'', phone:'', pubKey:''});
  }

  return (
    <Popover.Group className="p-4 rounded-xl text-sm font-semibold leading-6 text-white hover:bg-gray-600">
      <Popover className="relative">
        <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
          Új személy
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-gray-800 shadow-lg ring-1 ring-gray-500/5">
            <div className="p-4">
              <div className="group relative flex items-center gap-x-6 p-4 text-sm leading-6">
                <div className="flex-auto">
                  <p className="mt-1 text-white">Név</p>
                  <input type="text" 
                        className="text-black rounded border-2 border-white"
                        value={identity.name} onChange={e => setIdentity({name: e.target.value, email: identity.email, phone:identity.phone, pubKey:identity.pubKey})}
                  />
                </div>
              </div>

              <div className="group relative flex items-center gap-x-6 p-4 text-sm leading-6">
                <div className="flex-auto">
                  <p className="mt-1 text-white">E-mail cím</p>
                  <input type="text"
                        className="text-black rounded border-2 border-white"
                        value={identity.email} onChange={e => setIdentity({name: identity.name, email: e.target.value, phone:identity.phone, pubKey:identity.pubKey})}
                  />
                </div>
              </div>

              <div className="group relative flex items-center gap-x-6 p-4 text-sm leading-6">
                <div className="flex-auto">
                  <p className="mt-1 text-white">Telefonszám</p>
                  <input type="text"
                        className="text-black rounded border-2 border-white"
                        value={identity.phone} onChange={e => setIdentity({name: identity.name, email: identity.email, phone:e.target.value, pubKey:identity.pubKey})}
                  />
                </div>
              </div>

              <div className="group relative flex items-center gap-x-6 p-4 text-sm leading-6">
                <div className="flex-auto">
                  <p className="mt-1 text-white">Publikus kulcs</p>
                  <textarea className="text-black rounded border-2 border-white" style={{resize:"both"}}
                            value={identity.pubKey} onChange={e => setIdentity({name: identity.name, email: identity.email, phone:identity.phone, pubKey:e.target.value})}
                  />
                </div>
              </div>

              <div className="group relative flex items-center gap-x-6 p-4 text-sm leading-6">
                <button onClick={Save} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded inline-flex items-center">
                  Mentés
                </button>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </Popover.Group>        
  )
}

// =========================================================================
function TopMenu(props:{admin:boolean, nickName:string, walletId:string, onEdit}) {

  var enableNewPerson = props.admin ? "visible" : "invisible";

  function Exit() {
    sessionStorage.removeItem("nickName");
    sessionStorage.removeItem("walletId");

    window.location.reload();
  }

  function onNewClicked() {
    if (!props.admin) return;

    props.onEdit(true, '', '', '', '', '')
    var element = document.getElementById("edit-modal")
    if (element != null) element.classList.remove("hidden")
  }

  return (
    <header className="bg-black">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <img className="h-8 w-auto" src="contact-book.png" alt="" />
            </a>
        </div>        

        <button className={enableNewPerson} onClick={onNewClicked}>
          Új személy
        </button>

        <Popover.Group className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
              {props.nickName} <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -right-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-lg bg-white dark:bg-gray-700 shadow ring-1 ring-gray-500/5">
              <div className="p-4">
                <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6">
                  <div className="flex-auto">
                    <p className="mt-1 text-white">{props.walletId}</p>
                  </div>
                </div>
                <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-600"
                     onClick={Exit}
                >
                  <div className="flex-auto">
                    <p className="mt-1 text-white">Kilépés</p>
                  </div>
                </div>
              </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>        
      </nav>
    </header>
  )
}

// =========================================================================
function TopMenu_old(props:{admin:boolean, nickName:string, walletId:string}) {

  function Exit() {
    sessionStorage.removeItem("nickName");
    sessionStorage.removeItem("walletId");

    window.location.reload();
  }

  return (
    <header className="bg-black">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
        </div>        

        <NewIdentity_old admin={props.admin} />

        <Popover.Group className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
              {props.nickName} <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -right-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-gray-800 shadow-lg ring-1 ring-gray-500/5">
              <div className="p-4">
                <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6">
                  <div className="flex-auto">
                    <p className="mt-1 text-white">{props.walletId}</p>
                  </div>
                </div>
                <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-600"
                     onClick={Exit}
                >
                  <div className="flex-auto">
                    <p className="mt-1 text-white">Kilépés</p>
                  </div>
                </div>
              </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>        
      </nav>
    </header>
  )
}

// =========================================================================
function IdList(props:{admin : boolean, nickName : string}) {
  
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  function renderRows() {

    if (isLoading) {
      return (
        <Table.Row>
          <Table.Cell colSpan={tableWidth}>Adatok betöltése folyamatban.</Table.Cell>
        </Table.Row>
      )

    }

    if (tableContent == null || tableContent.length == 0) {
      return (
        <Table.Row>
          <Table.Cell colSpan={tableWidth}>Nincs megjeleníthető adat.</Table.Cell>
        </Table.Row>
      )
    }

    if (props.admin) {
      return tableContent.map((identity, index) => {
        return (
          <AdminView
            id={index}
            identity={identity}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />  
        )
      });
    }
    else {
      return tableContent.map((identity, index) => {
        return (
          <RestrictedView
            id={index}
            identity={identity}
          />  
        )
      });
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const initContent = async () => {
    const userCount = await userData.methods.getUserCount().call();

    const userAddresses = await Promise.all(
      Array(parseInt(userCount))
        .fill(null)
        .map((address, index) => {
          return userData.methods.userList(index).call();
        })
    );
  
    const identities = await Promise.all(
      Array(parseInt(userCount))
        .fill(null)
        .map((index, id) => {
          return userData.methods.users(userAddresses[id]).call();
        })
    );

    //console.log("identities: ", identities)

    setTableContent(identities);
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  const [tableContent, setTableContent] = useState([])
  const [isLoading, setLoading] = useState(true)
  
  const [userDeletion, setUserDeletion] = useState({name:'', address:''})
  var handleDelete = (name:string, address:string) => {
    setUserDeletion({name, address});
  }
  
  const [userEdit, setUserEdit] = useState({isCreating:true, name:'', email:'', phone:'', publickey:'', address:''})
  var handleEdit = (isCreating:boolean, name:string, email:string, phone:string, publickey:string, address:string) => {
    setUserEdit({isCreating, name, email, phone, publickey, address});
  }

  const walletId = String(sessionStorage.getItem("walletId"))

  useEffect(() => {
    initContent();
    setLoading(false);
  }, [])

//  <Table singleLine selectable>
return (
    <main>
      <TopMenu admin={props.admin} nickName={props.nickName} walletId={walletId} onEdit={handleEdit}/>

      <Table celled selectable>
      <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>név</Table.HeaderCell>
            <Table.HeaderCell>e-mail</Table.HeaderCell>
            <Table.HeaderCell>telefon</Table.HeaderCell>
            <Table.HeaderCell textAlign='right'>Művelet</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {renderRows()}
        </Table.Body>
      </Table>

      <DeleteConfirm admin={props.admin} user={userDeletion}/>
      <EditContact isCreating={userEdit.isCreating}
                   name={userEdit.name}
                   email={userEdit.email}
                   phone={userEdit.phone}
                   publickey={userEdit.publickey}
                   address={userEdit.address}
      />
    </main>
  )
}

// =========================================================================
export default IdList;
// =========================================================================
