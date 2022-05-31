import { format, parseISO } from "date-fns";


export function simplifyMerchantsExportData(rawData) {
    rawData = rawData.map(item => {
        return {
            fullName: item.fullName,
            email: item.email,
            phoneNumber: item.phoneNumber,
            address: item.address,
            region: item.region,
            state: item.state,
            substate: item.substate,
            date: format(parseISO(item.createdAt), "dd-MM-yyyy hh:mm a")
        }
    });
    return rawData
}

export function simplifyAgentsExportData(rawData) {
    rawData = rawData.map(item => {
        return {
            fullName: item.fullName,
            email: item.email,
            walletId: item.walletId,
            phoneNumber: item.phoneNumber,
            address: item.address,
            region: item.region,
            state: item.state,
            substate: item.substate,
            date: format(parseISO(item.createdAt), "dd-MM-yyyy hh:mm a")
        }
    });
    return rawData
}

export function simplifyComissionExportData(rawData) {
    rawData = rawData.map(item => {
        return {
            terminalId: item.terminalId,
            rrn: item.rrn,
            amount: item.amount / 100,
            status: item.responseMessage,
            terminalOwnerName: item.terminalOwnerName,
            PTSP: item.ptspCommission/100,
            TOwner: item.terminalOwnerCommission/100,
            acquirer: item.acquirerCommission/100,
            issuer: item.issuerCommission/100,
            swtch: item.switchCommission/100,
            PTSA: item.ptsaCommission/100,
            Total: item.totalCommission/100,
            date: format(parseISO(item.createdAt), "dd-MM-yyyy hh:mm a")
        }
    });
    return rawData
}

export function simplifyTerminalExportData(rawData) {
    rawData = rawData.map(item => {
        return {
            terminalSerial: item.terminalSerial,
            terminalId: item.terminalId,
            terminalOwner: item.terminalOwnerName,
            terminalManager: item.terminalManager,
            walletId: item.walletId,
            acquirer: item.acquirerName / 100,
            merchantAddress: item.merchantAddress,
            merchantEmail: item.merchantEmail,
            merchantName: item.merchantName,
            merchantPhoneNumber: item.merchantPhoneNumber,
            merchantType: item.merchantType,
            terminalHost: item.terminalHost,
            terminalStatus: item.terminalStatus,
            region: item.region,
            state: item.state,
            substate: item.substate,
            terminalType: item.terminalType,
            terminalActivated: item.terminalActivated,
            terminalRepairStatus: item.terminalRepairStatus,
            date: format(parseISO(item.createdAt), "dd-MM-yyyy hh:mm a")
        }
    });
    return rawData
}


export function simplifyVasExportData(rawData) {
    rawData = rawData.map(item => {
        return {
            terminalId: item.terminalId,
            walletId: item.walletId,
            rrn: item.rrn,
            customerRefNum: item.customerRefNum,
            stan: item.stan,
            amount: item.amount / 100,
            status: item.status,
            product: item.productName,
            responseMessage: item.responseMessage,
            cardPan: item.maskedPan,
            clientReference: item.clientReference,
            huaweiRef: item.tnxRef,
            settlementBank: item.settlementBank,
            tranType: item.tranType,
            merchantType: item.merchantType,
            region: item.region,
            state: item.state,
            substate: item.substate,
            processTime: item.processTime,
            date: format(parseISO(item.createdAt), "dd-MM-yyyy hh:mm a")
        }
    });
    return rawData
}

export function simplifySettlementExportData(rawData) {
    rawData = rawData.map(item => {
        return {
            terminalId: item.terminalId,
            walletId: item.walletId,
            rrn: item.rrn,
            stan: item.stan,
            amount: item.amount / 100,
            nibssStatus: 'successful',
            huaweiStatus: item.status,
            responseMessage: item.responseMessage,
            cardPan: item.maskedPan,
            authCode: item.authCode,
            clientReference: item.clientReference,
            huaweiRef: item.huaweiRef,
            settlementBank: item.settlementBank,
            tranType: item.tranType,
            merchantType: item.merchantType,
            region: item.region,
            state: item.state,
            substate: item.substate,
            processTime: item.processTime,
            date: format(parseISO(item.createdAt), "dd-MM-yyyy hh:mm a")
        }
    });
    return rawData
}

export function simplifyTransactionExportData(rawData) {
    rawData = rawData.map(item => {
        return {
            terminalId: item.terminalId,
            merchantName: item.merchantName,
            merchantId: item.merchantId,
            rrn: item.rrn,
            stan: item.stan,
            amount: item.amount/100,
            authCode: item.authCode,
            responseCode: item.responseCode,
            responseMessage: item.responseMessage,
            cardPan: item.maskedPan,
            tranType: item.tranType,
            merchantType: item.merchantType == '' ? 'merchant' : item.merchantType,
            settlementStatus: item.settlementStatus == 'true' ? 'SETTLED' : 'NONE',
            cardScheme: item.cardScheme,
            bankName: item.bankName,
            region: item.region,
            state: item.state,
            substate: item.substate,
            date: format(parseISO(item.createdAt), "dd-MM-yyyy hh:mm a")
        }
    });
    return rawData
}