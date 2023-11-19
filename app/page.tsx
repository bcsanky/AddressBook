"use client"
import Image from 'next/image';
import { useState, useEffect } from "react";
import IdList from './id_list';
import { Console } from 'console';

const adminWallet = "0xc06deb9887c03c6234526fdf385817651a931d60"; // kisbetuvel

// =========================================================================
function LogonPage() {

  const [nickName, setNickName] = useState("");
  const [result, setResult] = useState("");

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  async function handleClick() {
    if (!window.ethereum) {
      setResult("Hoppá! Nem találtam Metamask bővítményt.");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    sessionStorage.setItem("walletId", accounts[0]);
    sessionStorage.setItem("nickName", nickName);
    
    window.location.reload();
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  useEffect(() => {
    var container = document.getElementById('logo-container');
    if (container != null) return;

    container = document.getElementById('metamask');
    if (container != null) {
      container.innerHTML += '<div id="logo-container" />';
      mm();
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <script src="metamask.js"/>
      <p className="text-3xl">Identity Management</p>
      <div id="metamask" className="relative flex place-items-center" />
      <p>Milyen néven hívhatlak?</p>
      <input className="text-black rounded border-2 border-white" value={nickName} onChange={e => setNickName(e.target.value)} />
      <button className="h-10 w-36 ring-offset-2 ring-2 hover:ring-4" onClick={handleClick}>
        Belépés
      </button>
      <p>{result}</p>
    </main>
  )
}

// =========================================================================
export default function Home() {
  const [nickName, setNickName] = useState("");
  const [walletId, setWalletId] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    var Id = sessionStorage.getItem("walletId");
    if (Id !== null && Id !== walletId) setWalletId(Id)
    Id = sessionStorage.getItem("nickName");
    if (Id !== null && Id !== nickName) setNickName(Id)
  }, []);
 
  let isWalletValid = (walletId !== null && walletId !== undefined && walletId !== "");
  
//if (isWalletValid) alert(`account: ${walletId}`);

  if (isUserLoggedIn != isWalletValid) setIsUserLoggedIn(isWalletValid);

  if (!isUserLoggedIn) {
    return (
      <LogonPage />
    )
  }

  return (
    <IdList
      admin={walletId == adminWallet}
      nickName={nickName}
    />
  )
}

// =========================================================================
