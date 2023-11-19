import { Table } from "semantic-ui-react";

// =========================================================================
function AdminView(props: { id:number, identity: { name:string, email:string, phone:string, publicKey:string, userAddress:string}, onDelete, onEdit }) {

  function onDeleteClicked() {
    props.onDelete(props.identity.name, props.identity.userAddress)
    var element = document.getElementById("delete-modal")
    if (element != null) element.classList.remove("hidden")
  }

  function onEditClicked() {
    props.onEdit(false, props.identity.name, props.identity.email, props.identity.phone, props.identity.publicKey, props.identity.userAddress)
    var element = document.getElementById("edit-modal")
    if (element != null) element.classList.remove("hidden")
  }

  return (
    <Table.Row>
      <Table.Cell>{props.id + 1}</Table.Cell>
      <Table.Cell>{props.identity.name}</Table.Cell>
      <Table.Cell>{props.identity.email}</Table.Cell>
      <Table.Cell>{props.identity.phone}</Table.Cell>
      <Table.Cell>
        <button title="Módosítás"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded inline-flex items-center"
                onClick={onEditClicked}
        >
          <img src='edit.png' className="h-5 w-5"></img>
        </button>
        &nbsp;
        <button title="Másolás"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded inline-flex items-center"
                onClick={() => {navigator.clipboard.writeText(props.identity.publicKey); alert("A publikus kulcsot vágólapra másoltam!")}}
        >
            <img src='copy.png' className="h-5 w-5"></img>
        </button>
        &nbsp;
        <button title="Törlés"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded inline-flex items-center"
                onClick={onDeleteClicked}
        >
            <img src='bin.png' className="h-5 w-5"></img>
        </button>
      </Table.Cell>
    </Table.Row>
  )
}

// =========================================================================
export default AdminView;
// =========================================================================
