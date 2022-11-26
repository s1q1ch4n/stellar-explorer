import React, {useEffect} from 'react'
import {useDependantState} from '@stellar-expert/ui-framework'
import {navigation, parseQuery} from '@stellar-expert/navigation'
import DirectoryEntryPropsView from './directory-entry-props-view'
import {setPageMetadata} from '../../util/meta-tags-generator'

export default function DirectoryAddNewEntryView() {
    const {address: addressFromQuery} = parseQuery()
    const [requestedAddress] = useDependantState(() => addressFromQuery || null, [addressFromQuery])
    useEffect(() => {
        setPageMetadata({
            title: `Request address listing in StellarExpert Directory`,
            description: `Request address listing | Provide account address, organization domain name, title, and tags`
        })
    }, [])
    return <div className="card">
        <div className="desktop-only text-small" style={{float: 'right', paddingTop: '1em'}}>
            <a href="/directory">Back to Directory</a>
        </div>
        <h3>Directory – add new entry</h3>
        <hr/>
        <p className="dimmed text-small">Request form for address listing in StellarExpert Directory.</p>
        <DirectoryEntryPropsView requestedAddress={requestedAddress}
                                 onChange={entry => navigation.navigate('/directory/' + entry.address)}/>
        <div className="space dimmed text-small">
            <p>
                Please note: listing in the directory is not an endorsement, the maintainers do not verify legal
                entities operating the listed accounts.
            </p>
            <p>
                If you want to list a public address of your service or issuer address of your token, please make sure that
                the <code>home_domain</code> of the account is set and the appropriate stellar.toml is hosted on this domain
                to simplify the verification process.
            </p>
        </div>
    </div>
}