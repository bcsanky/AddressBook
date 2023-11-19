import { Table } from "semantic-ui-react";

// =========================================================================
function RestrictedView(props: { id: number; identity: { name: string; email: string; phone: string, publicKey:string}; }) {
  return (
    <Table.Row>
      <Table.Cell>{props.id + 1}</Table.Cell>
      <Table.Cell>{props.identity.name}</Table.Cell>
      <Table.Cell>{props.identity.email}</Table.Cell>
      <Table.Cell>{props.identity.phone}</Table.Cell>
      <Table.Cell>
      <button title="Másolás"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded inline-flex items-center"
                onClick={() => {navigator.clipboard.writeText(props.identity.publicKey); alert("A publikus kulcsot vágólapra másoltam!")}}
        >
          <img src='copy.png' className="h-5 w-5"></img>
        </button>
      </Table.Cell>
    </Table.Row>
  )
}

// =========================================================================
export default RestrictedView;
// =========================================================================
