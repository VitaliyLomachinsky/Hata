import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AgreementToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const agreementTokenABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
  },
  { type: 'error', inputs: [], name: 'CallerNotOwner' },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'error',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'length', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'StringsInsufficientHexLength',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getTotalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      {
        name: '_sdata',
        internalType: 'struct SigningData',
        type: 'tuple',
        components: [
          { name: 'propertyID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'location', internalType: 'string', type: 'string' },
          { name: 'landlord', internalType: 'address', type: 'address' },
          { name: 'tenant', internalType: 'address', type: 'address' },
          { name: 'isNative', internalType: 'bool', type: 'bool' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          { name: 'rentStart', internalType: 'uint256', type: 'uint256' },
          { name: 'rentFinish', internalType: 'uint256', type: 'uint256' },
          {
            name: 'agreementTimestamp',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Broker
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const brokerABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
  },
  { type: 'error', inputs: [], name: 'CallerNotOwner' },
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength',
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS',
  },
  {
    type: 'error',
    inputs: [{ name: 'propertyId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'IncorrectPropertyId',
  },
  {
    type: 'error',
    inputs: [{ name: 'signer', internalType: 'address', type: 'address' }],
    name: 'IncorrectSigner',
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'InvalidShortString' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [{ name: 'str', internalType: 'string', type: 'string' }],
    name: 'StringTooLong',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_mdata',
        internalType: 'struct MarketplaceData',
        type: 'tuple',
        components: [
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          { name: 'payment', internalType: 'enum PaymentType', type: 'uint8' },
          {
            name: 'status',
            internalType: 'enum PropertyStatus',
            type: 'uint8',
          },
          { name: 'tenant', internalType: 'address', type: 'address' },
          { name: 'rentStart', internalType: 'uint256', type: 'uint256' },
          { name: 'rentFinish', internalType: 'uint256', type: 'uint256' },
          { name: 'isNative', internalType: 'bool', type: 'bool' },
        ],
      },
      {
        name: '_pdata',
        internalType: 'struct PropertyData',
        type: 'tuple',
        components: [
          { name: 'propertyID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'location', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'landlord', internalType: 'address', type: 'address' },
          { name: 'area', internalType: 'uint16', type: 'uint16' },
          { name: 'previewCID', internalType: 'string', type: 'string' },
          { name: 'folderCID', internalType: 'string', type: 'string' },
        ],
      },
    ],
    name: 'createAgreement',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_propertyID', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getAgreementSigningData',
    outputs: [
      {
        name: '',
        internalType: 'struct SigningData',
        type: 'tuple',
        components: [
          { name: 'propertyID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'location', internalType: 'string', type: 'string' },
          { name: 'landlord', internalType: 'address', type: 'address' },
          { name: 'tenant', internalType: 'address', type: 'address' },
          { name: 'isNative', internalType: 'bool', type: 'bool' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          { name: 'rentStart', internalType: 'uint256', type: 'uint256' },
          { name: 'rentFinish', internalType: 'uint256', type: 'uint256' },
          {
            name: 'agreementTimestamp',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_token',
        internalType: 'contract AgreementToken',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'propertyID', internalType: 'bytes32', type: 'bytes32' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'signAgreement',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CollateralManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const collateralManagerABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_USDC', internalType: 'contract IERC20', type: 'address' },
    ],
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'CallerNotOwner' },
  { type: 'error', inputs: [], name: 'CollateralWithdrawalFailed' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_propertyID', internalType: 'bytes32', type: 'bytes32' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addCollateralETH',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_propertyID', internalType: 'bytes32', type: 'bytes32' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addCollateralUSDC',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: 'propertyID', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'getCollateralETH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: 'propertyID', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'getCollateralUSDC',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_propertyID', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'withdrawCollateralETH',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_propertyID', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'withdrawCollateralUSDC',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DataStreamMock
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const dataStreamMockABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'latestETHUSDPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IBroker
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iBrokerABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'priceId', internalType: 'uint16', type: 'uint16' }],
    name: 'getPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IFeeManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iFeeManagerABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'subscriber', internalType: 'address', type: 'address' },
      { name: 'report', internalType: 'bytes', type: 'bytes' },
      { name: 'quoteAddress', internalType: 'address', type: 'address' },
    ],
    name: 'getFeeAndReward',
    outputs: [
      {
        name: '',
        internalType: 'struct ChainlinkCommon.Asset',
        type: 'tuple',
        components: [
          { name: 'assetAddress', internalType: 'address', type: 'address' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: '',
        internalType: 'struct ChainlinkCommon.Asset',
        type: 'tuple',
        components: [
          { name: 'assetAddress', internalType: 'address', type: 'address' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'i_linkAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'i_nativeAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'i_rewardManager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ILogAutomation
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iLogAutomationABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'log',
        internalType: 'struct Log',
        type: 'tuple',
        components: [
          { name: 'index', internalType: 'uint256', type: 'uint256' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
          { name: 'txHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
          { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'source', internalType: 'address', type: 'address' },
          { name: 'topics', internalType: 'bytes32[]', type: 'bytes32[]' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'checkData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'checkLog',
    outputs: [
      { name: 'upkeepNeeded', internalType: 'bool', type: 'bool' },
      { name: 'performData', internalType: 'bytes', type: 'bytes' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'performData', internalType: 'bytes', type: 'bytes' }],
    name: 'performUpkeep',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iManagerABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'fees',
    outputs: [
      {
        name: '',
        internalType: 'struct FeeType',
        type: 'tuple',
        components: [
          { name: 'feeReceiver', internalType: 'address', type: 'address' },
          { name: 'feeAmount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMarketplace
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMarketplaceABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'propertyID', internalType: 'bytes32', type: 'bytes32' },
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
      { name: 'isNative', internalType: 'bool', type: 'bool' },
    ],
    name: 'createListing',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iRegistryABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'title', internalType: 'bytes32', type: 'bytes32' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'area', internalType: 'uint16', type: 'uint16' },
      { name: 'folderCID', internalType: 'string', type: 'string' },
    ],
    name: 'addProperty',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'propertyID', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getIsHashUsed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'propertyID', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getProperty',
    outputs: [
      {
        name: '',
        internalType: 'struct PropertyData',
        type: 'tuple',
        components: [
          { name: 'propertyID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'location', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'landlord', internalType: 'address', type: 'address' },
          { name: 'area', internalType: 'uint16', type: 'uint16' },
          { name: 'previewCID', internalType: 'string', type: 'string' },
          { name: 'folderCID', internalType: 'string', type: 'string' },
        ],
      },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IReportHandler
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iReportHandlerABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'report', internalType: 'bytes', type: 'bytes' }],
    name: 'handleReport',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IVerifierProxy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iVerifierProxyABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 's_feeManager',
    outputs: [
      {
        name: '',
        internalType: 'contract IVerifierFeeManager',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'payload', internalType: 'bytes', type: 'bytes' },
      { name: 'parameterPayload', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'verify',
    outputs: [
      { name: 'verifierResponse', internalType: 'bytes', type: 'bytes' },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Intermediary
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const intermediaryABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_manager', internalType: 'contract Manager', type: 'address' },
      { name: '_USDC', internalType: 'contract IERC20', type: 'address' },
    ],
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'CallerNotOwner' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'PaymentDepositingShouldBeFinished' },
  { type: 'error', inputs: [], name: 'PaymentScheduleFinished' },
  { type: 'error', inputs: [], name: 'PaymentTooEarly' },
  { type: 'error', inputs: [], name: 'PaymentWithdrawalFinished' },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'propertyID',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PaymentDeposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'propertyID',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PaymentWithdrew',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_propertyID', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getPayments',
    outputs: [
      {
        name: 'pdata',
        internalType: 'struct PaymentSchedule',
        type: 'tuple',
        components: [
          { name: 'landlord', internalType: 'address', type: 'address' },
          { name: 'tenant', internalType: 'address', type: 'address' },
          { name: 'payment', internalType: 'enum PaymentType', type: 'uint8' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          {
            name: 'totalDepositCount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'totalWithdrawalCount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'rentStart', internalType: 'uint256', type: 'uint256' },
          { name: 'rentFinish', internalType: 'uint256', type: 'uint256' },
          { name: 'lastPayment', internalType: 'uint256', type: 'uint256' },
          { name: 'isFinished', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_propertyID', internalType: 'bytes32', type: 'bytes32' },
      { name: '_landlord', internalType: 'address', type: 'address' },
      { name: '_tenant', internalType: 'address', type: 'address' },
      { name: '_price', internalType: 'uint256', type: 'uint256' },
      { name: '_payment', internalType: 'enum PaymentType', type: 'uint8' },
      { name: '_rentStart', internalType: 'uint256', type: 'uint256' },
      { name: '_rentFinish', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'makeFirstPayment',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_propertyID', internalType: 'bytes32', type: 'bytes32' }],
    name: 'makeFullPayment',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_propertyID', internalType: 'bytes32', type: 'bytes32' }],
    name: 'makeScheduledPayment',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_propertyID', internalType: 'bytes32', type: 'bytes32' }],
    name: 'withdawFullFunds',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_propertyID', internalType: 'bytes32', type: 'bytes32' }],
    name: 'withdawFunds',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LogEmitter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const logEmitterABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'msgSender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Log',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'emitLog',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Manager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const managerABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_USDC', internalType: 'contract IERC20', type: 'address' },
      {
        name: '_dataStream',
        internalType: 'contract StreamsLookupChainlinkAutomation',
        type: 'address',
      },
      {
        name: '_fees',
        internalType: 'struct FeeType',
        type: 'tuple',
        components: [
          { name: 'feeReceiver', internalType: 'address', type: 'address' },
          { name: 'feeAmount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'CallerNotOwner' },
  { type: 'error', inputs: [], name: 'CallerNotPropertyOwner' },
  { type: 'error', inputs: [], name: 'FailedETHTransfer' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InvaidDates' },
  { type: 'error', inputs: [], name: 'InvaidSigner' },
  { type: 'error', inputs: [], name: 'InvalidETHValue' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'InvalidPropertyID' },
  { type: 'error', inputs: [], name: 'InvalidRentLength' },
  { type: 'error', inputs: [], name: 'InvalidRentTimestamps' },
  { type: 'error', inputs: [], name: 'InvalidTimestamp' },
  {
    type: 'error',
    inputs: [
      { name: 'pendingAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'transferredAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ManagerInvalidETHValue',
  },
  {
    type: 'error',
    inputs: [
      { name: 'pendingAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'transferredAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ManagerInvalidUSDCValue',
  },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  { type: 'error', inputs: [], name: 'ValueOutOfRentRange' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_propertyID', internalType: 'bytes32', type: 'bytes32' },
      { name: '_rentStart', internalType: 'uint256', type: 'uint256' },
      { name: '_rentFinish', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'acceptListing',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_location', internalType: 'string', type: 'string' },
      { name: '_description', internalType: 'string', type: 'string' },
      { name: '_landlord', internalType: 'address', type: 'address' },
      { name: '_area', internalType: 'uint16', type: 'uint16' },
      { name: '_previewCID', internalType: 'string', type: 'string' },
      { name: '_folderCID', internalType: 'string', type: 'string' },
    ],
    name: 'addPropertyETH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_location', internalType: 'string', type: 'string' },
      { name: '_description', internalType: 'string', type: 'string' },
      { name: '_landlord', internalType: 'address', type: 'address' },
      { name: '_area', internalType: 'uint16', type: 'uint16' },
      { name: '_previewCID', internalType: 'string', type: 'string' },
      { name: '_folderCID', internalType: 'string', type: 'string' },
    ],
    name: 'addPropertyUSDC',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_price', internalType: 'uint256', type: 'uint256' }],
    name: 'calculatePriceEth',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_propertyID', internalType: 'bytes32', type: 'bytes32' },
      { name: '_price', internalType: 'uint256', type: 'uint256' },
      { name: '_payment', internalType: 'enum PaymentType', type: 'uint8' },
    ],
    name: 'createListingETH',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_propertyID', internalType: 'bytes32', type: 'bytes32' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
      { name: 'payment', internalType: 'enum PaymentType', type: 'uint8' },
    ],
    name: 'createListingUSDC',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_registry', internalType: 'contract Registry', type: 'address' },
      {
        name: '_market',
        internalType: 'contract Marketplace',
        type: 'address',
      },
      { name: '_broker', internalType: 'contract Broker', type: 'address' },
      {
        name: '_collateralManager',
        internalType: 'contract CollateralManager',
        type: 'address',
      },
      {
        name: '_intermediary',
        internalType: 'contract Intermediary',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_propertyID', internalType: 'bytes32', type: 'bytes32' }],
    name: 'payFullRent',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_propertyID', internalType: 'bytes32', type: 'bytes32' }],
    name: 'payRent',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_propertyID', internalType: 'bytes32', type: 'bytes32' }],
    name: 'receiveFullFunds',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_propertyID', internalType: 'bytes32', type: 'bytes32' }],
    name: 'receiveFunds',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'propertyID', internalType: 'bytes32', type: 'bytes32' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'signAgreement',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_propertyID', internalType: 'bytes32', type: 'bytes32' }],
    name: 'startRent',
    outputs: [],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Marketplace
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const marketplaceABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_registry', internalType: 'contract Registry', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'CallerNotOwner' },
  { type: 'error', inputs: [], name: 'OnlyManagerCalls' },
  { type: 'error', inputs: [], name: 'PropertyNotNew' },
  { type: 'error', inputs: [], name: 'PropertyNotRent' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_propertyID',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: '_tenant',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: '_rentStart',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_rentUntil',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ListingAccepted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_propertyID',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: '_price',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_payment',
        internalType: 'enum PaymentType',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'ListingCreated',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_propertyID', internalType: 'bytes32', type: 'bytes32' },
      { name: '_tenant', internalType: 'address', type: 'address' },
      { name: '_rentStart', internalType: 'uint256', type: 'uint256' },
      { name: '_rentFinish', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'acceptListing',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_propertyID', internalType: 'bytes32', type: 'bytes32' },
      { name: '_price', internalType: 'uint256', type: 'uint256' },
      { name: '_payment', internalType: 'enum PaymentType', type: 'uint8' },
      { name: '_isNative', internalType: 'bool', type: 'bool' },
    ],
    name: 'createListing',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_propertyID', internalType: 'bytes32', type: 'bytes32' }],
    name: 'finishListing',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getActiveProperty',
    outputs: [{ name: '', internalType: 'bytes32[]', type: 'bytes32[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_propertyID', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getListing',
    outputs: [
      {
        name: '',
        internalType: 'struct MarketplaceData',
        type: 'tuple',
        components: [
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          { name: 'payment', internalType: 'enum PaymentType', type: 'uint8' },
          {
            name: 'status',
            internalType: 'enum PropertyStatus',
            type: 'uint8',
          },
          { name: 'tenant', internalType: 'address', type: 'address' },
          { name: 'rentStart', internalType: 'uint256', type: 'uint256' },
          { name: 'rentFinish', internalType: 'uint256', type: 'uint256' },
          { name: 'isNative', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_propertyID', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getListingWithData',
    outputs: [
      {
        name: '',
        internalType: 'struct MarketplaceData',
        type: 'tuple',
        components: [
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          { name: 'payment', internalType: 'enum PaymentType', type: 'uint8' },
          {
            name: 'status',
            internalType: 'enum PropertyStatus',
            type: 'uint8',
          },
          { name: 'tenant', internalType: 'address', type: 'address' },
          { name: 'rentStart', internalType: 'uint256', type: 'uint256' },
          { name: 'rentFinish', internalType: 'uint256', type: 'uint256' },
          { name: 'isNative', internalType: 'bool', type: 'bool' },
        ],
      },
      {
        name: '',
        internalType: 'struct PropertyData',
        type: 'tuple',
        components: [
          { name: 'propertyID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'location', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'landlord', internalType: 'address', type: 'address' },
          { name: 'area', internalType: 'uint16', type: 'uint16' },
          { name: 'previewCID', internalType: 'string', type: 'string' },
          { name: 'folderCID', internalType: 'string', type: 'string' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
  },
  { type: 'error', inputs: [], name: 'CallerNotOwner' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Registry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const registryABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
  },
  { type: 'error', inputs: [], name: 'CallerNotOwner' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'propertyID',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'landlord',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'location',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      { name: 'area', internalType: 'uint16', type: 'uint16', indexed: false },
      {
        name: 'previewCID',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'PropertyAdded',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_location', internalType: 'string', type: 'string' },
      { name: '_description', internalType: 'string', type: 'string' },
      { name: '_landlord', internalType: 'address', type: 'address' },
      { name: '_area', internalType: 'uint16', type: 'uint16' },
      { name: '_previewCID', internalType: 'string', type: 'string' },
      { name: '_folderCID', internalType: 'string', type: 'string' },
    ],
    name: 'addProperty',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_propertyID', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getIsHashUsed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_propertyID', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getProperty',
    outputs: [
      {
        name: '',
        internalType: 'struct PropertyData',
        type: 'tuple',
        components: [
          { name: 'propertyID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'location', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'landlord', internalType: 'address', type: 'address' },
          { name: 'area', internalType: 'uint16', type: 'uint16' },
          { name: 'previewCID', internalType: 'string', type: 'string' },
          { name: 'folderCID', internalType: 'string', type: 'string' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_landlord', internalType: 'address', type: 'address' }],
    name: 'getPropertyByOwner',
    outputs: [{ name: '', internalType: 'bytes32[]', type: 'bytes32[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StreamsLookupChainlinkAutomation
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const streamsLookupChainlinkAutomationABI = [
  { type: 'error', inputs: [], name: 'DataStreamError' },
  {
    type: 'error',
    inputs: [
      { name: 'feedParamKey', internalType: 'string', type: 'string' },
      { name: 'feeds', internalType: 'string[]', type: 'string[]' },
      { name: 'timeParamKey', internalType: 'string', type: 'string' },
      { name: 'time', internalType: 'uint256', type: 'uint256' },
      { name: 'extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'StreamsLookup',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'price',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'PriceUpdated',
  },
  { stateMutability: 'payable', type: 'fallback' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'FEE_ADDRESS',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'STRING_DATASTREAMS_FEEDLABEL',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'STRING_DATASTREAMS_QUERYLABEL',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: 'values', internalType: 'bytes[]', type: 'bytes[]' },
      { name: 'extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'checkCallback',
    outputs: [
      { name: '', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'log',
        internalType: 'struct Log',
        type: 'tuple',
        components: [
          { name: 'index', internalType: 'uint256', type: 'uint256' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
          { name: 'txHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
          { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'source', internalType: 'address', type: 'address' },
          { name: 'topics', internalType: 'bytes32[]', type: 'bytes32[]' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'checkLog',
    outputs: [
      { name: 'upkeepNeeded', internalType: 'bool', type: 'bool' },
      { name: 'performData', internalType: 'bytes', type: 'bytes' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'feedIds',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'latestETHUSDPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'performData', internalType: 'bytes', type: 'bytes' }],
    name: 'performUpkeep',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'verifier',
    outputs: [
      { name: '', internalType: 'contract IVerifierProxy', type: 'address' },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StreamsLookupCompatibleInterface
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const streamsLookupCompatibleInterfaceABI = [
  {
    type: 'error',
    inputs: [
      { name: 'feedParamKey', internalType: 'string', type: 'string' },
      { name: 'feeds', internalType: 'string[]', type: 'string[]' },
      { name: 'timeParamKey', internalType: 'string', type: 'string' },
      { name: 'time', internalType: 'uint256', type: 'uint256' },
      { name: 'extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'StreamsLookup',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'values', internalType: 'bytes[]', type: 'bytes[]' },
      { name: 'extraData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'checkCallback',
    outputs: [
      { name: 'upkeepNeeded', internalType: 'bool', type: 'bool' },
      { name: 'performData', internalType: 'bytes', type: 'bytes' },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USDCMock
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const usdcMockABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link agreementTokenABI}__.
 */
export function useAgreementTokenRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof agreementTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof agreementTokenABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: agreementTokenABI,
    ...config,
  } as UseContractReadConfig<
    typeof agreementTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link agreementTokenABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useAgreementTokenBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof agreementTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof agreementTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: agreementTokenABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof agreementTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link agreementTokenABI}__ and `functionName` set to `"getApproved"`.
 */
export function useAgreementTokenGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof agreementTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof agreementTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: agreementTokenABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<
    typeof agreementTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link agreementTokenABI}__ and `functionName` set to `"getTotalSupply"`.
 */
export function useAgreementTokenGetTotalSupply<
  TFunctionName extends 'getTotalSupply',
  TSelectData = ReadContractResult<typeof agreementTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof agreementTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: agreementTokenABI,
    functionName: 'getTotalSupply',
    ...config,
  } as UseContractReadConfig<
    typeof agreementTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link agreementTokenABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useAgreementTokenIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof agreementTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof agreementTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: agreementTokenABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<
    typeof agreementTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link agreementTokenABI}__ and `functionName` set to `"name"`.
 */
export function useAgreementTokenName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof agreementTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof agreementTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: agreementTokenABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<
    typeof agreementTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link agreementTokenABI}__ and `functionName` set to `"owner"`.
 */
export function useAgreementTokenOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof agreementTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof agreementTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: agreementTokenABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof agreementTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link agreementTokenABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useAgreementTokenOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof agreementTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof agreementTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: agreementTokenABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<
    typeof agreementTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link agreementTokenABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useAgreementTokenSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof agreementTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof agreementTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: agreementTokenABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof agreementTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link agreementTokenABI}__ and `functionName` set to `"symbol"`.
 */
export function useAgreementTokenSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof agreementTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof agreementTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: agreementTokenABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<
    typeof agreementTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link agreementTokenABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useAgreementTokenTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof agreementTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof agreementTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: agreementTokenABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<
    typeof agreementTokenABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link agreementTokenABI}__.
 */
export function useAgreementTokenWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof agreementTokenABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof agreementTokenABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof agreementTokenABI, TFunctionName, TMode>({
    abi: agreementTokenABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link agreementTokenABI}__ and `functionName` set to `"approve"`.
 */
export function useAgreementTokenApprove<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof agreementTokenABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof agreementTokenABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof agreementTokenABI, 'approve', TMode>({
    abi: agreementTokenABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link agreementTokenABI}__ and `functionName` set to `"mint"`.
 */
export function useAgreementTokenMint<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof agreementTokenABI,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof agreementTokenABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof agreementTokenABI, 'mint', TMode>({
    abi: agreementTokenABI,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link agreementTokenABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useAgreementTokenSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof agreementTokenABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<
        typeof agreementTokenABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof agreementTokenABI, 'safeTransferFrom', TMode>({
    abi: agreementTokenABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link agreementTokenABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useAgreementTokenSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof agreementTokenABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<
        typeof agreementTokenABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof agreementTokenABI, 'setApprovalForAll', TMode>(
    {
      abi: agreementTokenABI,
      functionName: 'setApprovalForAll',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link agreementTokenABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useAgreementTokenTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof agreementTokenABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<
        typeof agreementTokenABI,
        'transferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof agreementTokenABI, 'transferFrom', TMode>({
    abi: agreementTokenABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link agreementTokenABI}__.
 */
export function usePrepareAgreementTokenWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof agreementTokenABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: agreementTokenABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof agreementTokenABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link agreementTokenABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareAgreementTokenApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof agreementTokenABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: agreementTokenABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof agreementTokenABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link agreementTokenABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareAgreementTokenMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof agreementTokenABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: agreementTokenABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof agreementTokenABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link agreementTokenABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareAgreementTokenSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof agreementTokenABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: agreementTokenABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof agreementTokenABI,
    'safeTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link agreementTokenABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareAgreementTokenSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof agreementTokenABI,
      'setApprovalForAll'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: agreementTokenABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof agreementTokenABI,
    'setApprovalForAll'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link agreementTokenABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareAgreementTokenTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof agreementTokenABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: agreementTokenABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof agreementTokenABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link agreementTokenABI}__.
 */
export function useAgreementTokenEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof agreementTokenABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: agreementTokenABI,
    ...config,
  } as UseContractEventConfig<typeof agreementTokenABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link agreementTokenABI}__ and `eventName` set to `"Approval"`.
 */
export function useAgreementTokenApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof agreementTokenABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: agreementTokenABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof agreementTokenABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link agreementTokenABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useAgreementTokenApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof agreementTokenABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: agreementTokenABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof agreementTokenABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link agreementTokenABI}__ and `eventName` set to `"Transfer"`.
 */
export function useAgreementTokenTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof agreementTokenABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: agreementTokenABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof agreementTokenABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link brokerABI}__.
 */
export function useBrokerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof brokerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof brokerABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: brokerABI, ...config } as UseContractReadConfig<
    typeof brokerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link brokerABI}__ and `functionName` set to `"eip712Domain"`.
 */
export function useBrokerEip712Domain<
  TFunctionName extends 'eip712Domain',
  TSelectData = ReadContractResult<typeof brokerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof brokerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: brokerABI,
    functionName: 'eip712Domain',
    ...config,
  } as UseContractReadConfig<typeof brokerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link brokerABI}__ and `functionName` set to `"getAgreementSigningData"`.
 */
export function useBrokerGetAgreementSigningData<
  TFunctionName extends 'getAgreementSigningData',
  TSelectData = ReadContractResult<typeof brokerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof brokerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: brokerABI,
    functionName: 'getAgreementSigningData',
    ...config,
  } as UseContractReadConfig<typeof brokerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link brokerABI}__ and `functionName` set to `"owner"`.
 */
export function useBrokerOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof brokerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof brokerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: brokerABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof brokerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link brokerABI}__.
 */
export function useBrokerWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof brokerABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof brokerABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof brokerABI, TFunctionName, TMode>({
    abi: brokerABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link brokerABI}__ and `functionName` set to `"createAgreement"`.
 */
export function useBrokerCreateAgreement<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof brokerABI,
          'createAgreement'
        >['request']['abi'],
        'createAgreement',
        TMode
      > & { functionName?: 'createAgreement' }
    : UseContractWriteConfig<typeof brokerABI, 'createAgreement', TMode> & {
        abi?: never
        functionName?: 'createAgreement'
      } = {} as any,
) {
  return useContractWrite<typeof brokerABI, 'createAgreement', TMode>({
    abi: brokerABI,
    functionName: 'createAgreement',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link brokerABI}__ and `functionName` set to `"initialize"`.
 */
export function useBrokerInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof brokerABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof brokerABI, 'initialize', TMode> & {
        abi?: never
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof brokerABI, 'initialize', TMode>({
    abi: brokerABI,
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link brokerABI}__ and `functionName` set to `"signAgreement"`.
 */
export function useBrokerSignAgreement<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof brokerABI,
          'signAgreement'
        >['request']['abi'],
        'signAgreement',
        TMode
      > & { functionName?: 'signAgreement' }
    : UseContractWriteConfig<typeof brokerABI, 'signAgreement', TMode> & {
        abi?: never
        functionName?: 'signAgreement'
      } = {} as any,
) {
  return useContractWrite<typeof brokerABI, 'signAgreement', TMode>({
    abi: brokerABI,
    functionName: 'signAgreement',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link brokerABI}__.
 */
export function usePrepareBrokerWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof brokerABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: brokerABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof brokerABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link brokerABI}__ and `functionName` set to `"createAgreement"`.
 */
export function usePrepareBrokerCreateAgreement(
  config: Omit<
    UsePrepareContractWriteConfig<typeof brokerABI, 'createAgreement'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: brokerABI,
    functionName: 'createAgreement',
    ...config,
  } as UsePrepareContractWriteConfig<typeof brokerABI, 'createAgreement'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link brokerABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareBrokerInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof brokerABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: brokerABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof brokerABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link brokerABI}__ and `functionName` set to `"signAgreement"`.
 */
export function usePrepareBrokerSignAgreement(
  config: Omit<
    UsePrepareContractWriteConfig<typeof brokerABI, 'signAgreement'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: brokerABI,
    functionName: 'signAgreement',
    ...config,
  } as UsePrepareContractWriteConfig<typeof brokerABI, 'signAgreement'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link brokerABI}__.
 */
export function useBrokerEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof brokerABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: brokerABI,
    ...config,
  } as UseContractEventConfig<typeof brokerABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link brokerABI}__ and `eventName` set to `"EIP712DomainChanged"`.
 */
export function useBrokerEip712DomainChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof brokerABI, 'EIP712DomainChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: brokerABI,
    eventName: 'EIP712DomainChanged',
    ...config,
  } as UseContractEventConfig<typeof brokerABI, 'EIP712DomainChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link brokerABI}__ and `eventName` set to `"Initialized"`.
 */
export function useBrokerInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof brokerABI, 'Initialized'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: brokerABI,
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof brokerABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link collateralManagerABI}__.
 */
export function useCollateralManagerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof collateralManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof collateralManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: collateralManagerABI,
    ...config,
  } as UseContractReadConfig<
    typeof collateralManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link collateralManagerABI}__ and `functionName` set to `"getCollateralETH"`.
 */
export function useCollateralManagerGetCollateralEth<
  TFunctionName extends 'getCollateralETH',
  TSelectData = ReadContractResult<typeof collateralManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof collateralManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: collateralManagerABI,
    functionName: 'getCollateralETH',
    ...config,
  } as UseContractReadConfig<
    typeof collateralManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link collateralManagerABI}__ and `functionName` set to `"getCollateralUSDC"`.
 */
export function useCollateralManagerGetCollateralUsdc<
  TFunctionName extends 'getCollateralUSDC',
  TSelectData = ReadContractResult<typeof collateralManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof collateralManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: collateralManagerABI,
    functionName: 'getCollateralUSDC',
    ...config,
  } as UseContractReadConfig<
    typeof collateralManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link collateralManagerABI}__ and `functionName` set to `"owner"`.
 */
export function useCollateralManagerOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof collateralManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof collateralManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: collateralManagerABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof collateralManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link collateralManagerABI}__.
 */
export function useCollateralManagerWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof collateralManagerABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof collateralManagerABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof collateralManagerABI, TFunctionName, TMode>({
    abi: collateralManagerABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link collateralManagerABI}__ and `functionName` set to `"addCollateralETH"`.
 */
export function useCollateralManagerAddCollateralEth<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof collateralManagerABI,
          'addCollateralETH'
        >['request']['abi'],
        'addCollateralETH',
        TMode
      > & { functionName?: 'addCollateralETH' }
    : UseContractWriteConfig<
        typeof collateralManagerABI,
        'addCollateralETH',
        TMode
      > & {
        abi?: never
        functionName?: 'addCollateralETH'
      } = {} as any,
) {
  return useContractWrite<
    typeof collateralManagerABI,
    'addCollateralETH',
    TMode
  >({
    abi: collateralManagerABI,
    functionName: 'addCollateralETH',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link collateralManagerABI}__ and `functionName` set to `"addCollateralUSDC"`.
 */
export function useCollateralManagerAddCollateralUsdc<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof collateralManagerABI,
          'addCollateralUSDC'
        >['request']['abi'],
        'addCollateralUSDC',
        TMode
      > & { functionName?: 'addCollateralUSDC' }
    : UseContractWriteConfig<
        typeof collateralManagerABI,
        'addCollateralUSDC',
        TMode
      > & {
        abi?: never
        functionName?: 'addCollateralUSDC'
      } = {} as any,
) {
  return useContractWrite<
    typeof collateralManagerABI,
    'addCollateralUSDC',
    TMode
  >({
    abi: collateralManagerABI,
    functionName: 'addCollateralUSDC',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link collateralManagerABI}__ and `functionName` set to `"withdrawCollateralETH"`.
 */
export function useCollateralManagerWithdrawCollateralEth<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof collateralManagerABI,
          'withdrawCollateralETH'
        >['request']['abi'],
        'withdrawCollateralETH',
        TMode
      > & { functionName?: 'withdrawCollateralETH' }
    : UseContractWriteConfig<
        typeof collateralManagerABI,
        'withdrawCollateralETH',
        TMode
      > & {
        abi?: never
        functionName?: 'withdrawCollateralETH'
      } = {} as any,
) {
  return useContractWrite<
    typeof collateralManagerABI,
    'withdrawCollateralETH',
    TMode
  >({
    abi: collateralManagerABI,
    functionName: 'withdrawCollateralETH',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link collateralManagerABI}__ and `functionName` set to `"withdrawCollateralUSDC"`.
 */
export function useCollateralManagerWithdrawCollateralUsdc<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof collateralManagerABI,
          'withdrawCollateralUSDC'
        >['request']['abi'],
        'withdrawCollateralUSDC',
        TMode
      > & { functionName?: 'withdrawCollateralUSDC' }
    : UseContractWriteConfig<
        typeof collateralManagerABI,
        'withdrawCollateralUSDC',
        TMode
      > & {
        abi?: never
        functionName?: 'withdrawCollateralUSDC'
      } = {} as any,
) {
  return useContractWrite<
    typeof collateralManagerABI,
    'withdrawCollateralUSDC',
    TMode
  >({
    abi: collateralManagerABI,
    functionName: 'withdrawCollateralUSDC',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link collateralManagerABI}__.
 */
export function usePrepareCollateralManagerWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof collateralManagerABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: collateralManagerABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof collateralManagerABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link collateralManagerABI}__ and `functionName` set to `"addCollateralETH"`.
 */
export function usePrepareCollateralManagerAddCollateralEth(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof collateralManagerABI,
      'addCollateralETH'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: collateralManagerABI,
    functionName: 'addCollateralETH',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof collateralManagerABI,
    'addCollateralETH'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link collateralManagerABI}__ and `functionName` set to `"addCollateralUSDC"`.
 */
export function usePrepareCollateralManagerAddCollateralUsdc(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof collateralManagerABI,
      'addCollateralUSDC'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: collateralManagerABI,
    functionName: 'addCollateralUSDC',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof collateralManagerABI,
    'addCollateralUSDC'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link collateralManagerABI}__ and `functionName` set to `"withdrawCollateralETH"`.
 */
export function usePrepareCollateralManagerWithdrawCollateralEth(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof collateralManagerABI,
      'withdrawCollateralETH'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: collateralManagerABI,
    functionName: 'withdrawCollateralETH',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof collateralManagerABI,
    'withdrawCollateralETH'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link collateralManagerABI}__ and `functionName` set to `"withdrawCollateralUSDC"`.
 */
export function usePrepareCollateralManagerWithdrawCollateralUsdc(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof collateralManagerABI,
      'withdrawCollateralUSDC'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: collateralManagerABI,
    functionName: 'withdrawCollateralUSDC',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof collateralManagerABI,
    'withdrawCollateralUSDC'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dataStreamMockABI}__.
 */
export function useDataStreamMockRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof dataStreamMockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dataStreamMockABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: dataStreamMockABI,
    ...config,
  } as UseContractReadConfig<
    typeof dataStreamMockABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link dataStreamMockABI}__ and `functionName` set to `"latestETHUSDPrice"`.
 */
export function useDataStreamMockLatestEthusdPrice<
  TFunctionName extends 'latestETHUSDPrice',
  TSelectData = ReadContractResult<typeof dataStreamMockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof dataStreamMockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: dataStreamMockABI,
    functionName: 'latestETHUSDPrice',
    ...config,
  } as UseContractReadConfig<
    typeof dataStreamMockABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iBrokerABI}__.
 */
export function useIBrokerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iBrokerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iBrokerABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iBrokerABI,
    ...config,
  } as UseContractReadConfig<typeof iBrokerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iBrokerABI}__ and `functionName` set to `"getPrice"`.
 */
export function useIBrokerGetPrice<
  TFunctionName extends 'getPrice',
  TSelectData = ReadContractResult<typeof iBrokerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iBrokerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iBrokerABI,
    functionName: 'getPrice',
    ...config,
  } as UseContractReadConfig<typeof iBrokerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function useIerc20Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc20ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, TFunctionName, TMode>({
    abi: ierc20ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc20Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof ierc20ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, 'approve', TMode>({
    abi: ierc20ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function usePrepareIerc20Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc20Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20ABI, 'approve'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iFeeManagerABI}__.
 */
export function useIFeeManagerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iFeeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iFeeManagerABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iFeeManagerABI,
    ...config,
  } as UseContractReadConfig<typeof iFeeManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iFeeManagerABI}__ and `functionName` set to `"i_linkAddress"`.
 */
export function useIFeeManagerILinkAddress<
  TFunctionName extends 'i_linkAddress',
  TSelectData = ReadContractResult<typeof iFeeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iFeeManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iFeeManagerABI,
    functionName: 'i_linkAddress',
    ...config,
  } as UseContractReadConfig<typeof iFeeManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iFeeManagerABI}__ and `functionName` set to `"i_nativeAddress"`.
 */
export function useIFeeManagerINativeAddress<
  TFunctionName extends 'i_nativeAddress',
  TSelectData = ReadContractResult<typeof iFeeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iFeeManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iFeeManagerABI,
    functionName: 'i_nativeAddress',
    ...config,
  } as UseContractReadConfig<typeof iFeeManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iFeeManagerABI}__ and `functionName` set to `"i_rewardManager"`.
 */
export function useIFeeManagerIRewardManager<
  TFunctionName extends 'i_rewardManager',
  TSelectData = ReadContractResult<typeof iFeeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iFeeManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iFeeManagerABI,
    functionName: 'i_rewardManager',
    ...config,
  } as UseContractReadConfig<typeof iFeeManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iFeeManagerABI}__.
 */
export function useIFeeManagerWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iFeeManagerABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iFeeManagerABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iFeeManagerABI, TFunctionName, TMode>({
    abi: iFeeManagerABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iFeeManagerABI}__ and `functionName` set to `"getFeeAndReward"`.
 */
export function useIFeeManagerGetFeeAndReward<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iFeeManagerABI,
          'getFeeAndReward'
        >['request']['abi'],
        'getFeeAndReward',
        TMode
      > & { functionName?: 'getFeeAndReward' }
    : UseContractWriteConfig<
        typeof iFeeManagerABI,
        'getFeeAndReward',
        TMode
      > & {
        abi?: never
        functionName?: 'getFeeAndReward'
      } = {} as any,
) {
  return useContractWrite<typeof iFeeManagerABI, 'getFeeAndReward', TMode>({
    abi: iFeeManagerABI,
    functionName: 'getFeeAndReward',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iFeeManagerABI}__.
 */
export function usePrepareIFeeManagerWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iFeeManagerABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iFeeManagerABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iFeeManagerABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iFeeManagerABI}__ and `functionName` set to `"getFeeAndReward"`.
 */
export function usePrepareIFeeManagerGetFeeAndReward(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iFeeManagerABI, 'getFeeAndReward'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iFeeManagerABI,
    functionName: 'getFeeAndReward',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iFeeManagerABI, 'getFeeAndReward'>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iLogAutomationABI}__.
 */
export function useILogAutomationWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iLogAutomationABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iLogAutomationABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iLogAutomationABI, TFunctionName, TMode>({
    abi: iLogAutomationABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iLogAutomationABI}__ and `functionName` set to `"checkLog"`.
 */
export function useILogAutomationCheckLog<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iLogAutomationABI,
          'checkLog'
        >['request']['abi'],
        'checkLog',
        TMode
      > & { functionName?: 'checkLog' }
    : UseContractWriteConfig<typeof iLogAutomationABI, 'checkLog', TMode> & {
        abi?: never
        functionName?: 'checkLog'
      } = {} as any,
) {
  return useContractWrite<typeof iLogAutomationABI, 'checkLog', TMode>({
    abi: iLogAutomationABI,
    functionName: 'checkLog',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iLogAutomationABI}__ and `functionName` set to `"performUpkeep"`.
 */
export function useILogAutomationPerformUpkeep<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iLogAutomationABI,
          'performUpkeep'
        >['request']['abi'],
        'performUpkeep',
        TMode
      > & { functionName?: 'performUpkeep' }
    : UseContractWriteConfig<
        typeof iLogAutomationABI,
        'performUpkeep',
        TMode
      > & {
        abi?: never
        functionName?: 'performUpkeep'
      } = {} as any,
) {
  return useContractWrite<typeof iLogAutomationABI, 'performUpkeep', TMode>({
    abi: iLogAutomationABI,
    functionName: 'performUpkeep',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iLogAutomationABI}__.
 */
export function usePrepareILogAutomationWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iLogAutomationABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iLogAutomationABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iLogAutomationABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iLogAutomationABI}__ and `functionName` set to `"checkLog"`.
 */
export function usePrepareILogAutomationCheckLog(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iLogAutomationABI, 'checkLog'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iLogAutomationABI,
    functionName: 'checkLog',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iLogAutomationABI, 'checkLog'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iLogAutomationABI}__ and `functionName` set to `"performUpkeep"`.
 */
export function usePrepareILogAutomationPerformUpkeep(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iLogAutomationABI, 'performUpkeep'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iLogAutomationABI,
    functionName: 'performUpkeep',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iLogAutomationABI, 'performUpkeep'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iManagerABI}__.
 */
export function useIManagerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iManagerABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iManagerABI,
    ...config,
  } as UseContractReadConfig<typeof iManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iManagerABI}__ and `functionName` set to `"fees"`.
 */
export function useIManagerFees<
  TFunctionName extends 'fees',
  TSelectData = ReadContractResult<typeof iManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iManagerABI,
    functionName: 'fees',
    ...config,
  } as UseContractReadConfig<typeof iManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMarketplaceABI}__.
 */
export function useIMarketplaceWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iMarketplaceABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iMarketplaceABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iMarketplaceABI, TFunctionName, TMode>({
    abi: iMarketplaceABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMarketplaceABI}__ and `functionName` set to `"createListing"`.
 */
export function useIMarketplaceCreateListing<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iMarketplaceABI,
          'createListing'
        >['request']['abi'],
        'createListing',
        TMode
      > & { functionName?: 'createListing' }
    : UseContractWriteConfig<typeof iMarketplaceABI, 'createListing', TMode> & {
        abi?: never
        functionName?: 'createListing'
      } = {} as any,
) {
  return useContractWrite<typeof iMarketplaceABI, 'createListing', TMode>({
    abi: iMarketplaceABI,
    functionName: 'createListing',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMarketplaceABI}__.
 */
export function usePrepareIMarketplaceWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iMarketplaceABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iMarketplaceABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iMarketplaceABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMarketplaceABI}__ and `functionName` set to `"createListing"`.
 */
export function usePrepareIMarketplaceCreateListing(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iMarketplaceABI, 'createListing'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iMarketplaceABI,
    functionName: 'createListing',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iMarketplaceABI, 'createListing'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iRegistryABI}__.
 */
export function useIRegistryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iRegistryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iRegistryABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iRegistryABI,
    ...config,
  } as UseContractReadConfig<typeof iRegistryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iRegistryABI}__ and `functionName` set to `"getIsHashUsed"`.
 */
export function useIRegistryGetIsHashUsed<
  TFunctionName extends 'getIsHashUsed',
  TSelectData = ReadContractResult<typeof iRegistryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iRegistryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iRegistryABI,
    functionName: 'getIsHashUsed',
    ...config,
  } as UseContractReadConfig<typeof iRegistryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iRegistryABI}__ and `functionName` set to `"getProperty"`.
 */
export function useIRegistryGetProperty<
  TFunctionName extends 'getProperty',
  TSelectData = ReadContractResult<typeof iRegistryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iRegistryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iRegistryABI,
    functionName: 'getProperty',
    ...config,
  } as UseContractReadConfig<typeof iRegistryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iRegistryABI}__.
 */
export function useIRegistryWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iRegistryABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iRegistryABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iRegistryABI, TFunctionName, TMode>({
    abi: iRegistryABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iRegistryABI}__ and `functionName` set to `"addProperty"`.
 */
export function useIRegistryAddProperty<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iRegistryABI,
          'addProperty'
        >['request']['abi'],
        'addProperty',
        TMode
      > & { functionName?: 'addProperty' }
    : UseContractWriteConfig<typeof iRegistryABI, 'addProperty', TMode> & {
        abi?: never
        functionName?: 'addProperty'
      } = {} as any,
) {
  return useContractWrite<typeof iRegistryABI, 'addProperty', TMode>({
    abi: iRegistryABI,
    functionName: 'addProperty',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iRegistryABI}__.
 */
export function usePrepareIRegistryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iRegistryABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iRegistryABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iRegistryABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iRegistryABI}__ and `functionName` set to `"addProperty"`.
 */
export function usePrepareIRegistryAddProperty(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iRegistryABI, 'addProperty'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iRegistryABI,
    functionName: 'addProperty',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iRegistryABI, 'addProperty'>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iReportHandlerABI}__.
 */
export function useIReportHandlerWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iReportHandlerABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iReportHandlerABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iReportHandlerABI, TFunctionName, TMode>({
    abi: iReportHandlerABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iReportHandlerABI}__ and `functionName` set to `"handleReport"`.
 */
export function useIReportHandlerHandleReport<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iReportHandlerABI,
          'handleReport'
        >['request']['abi'],
        'handleReport',
        TMode
      > & { functionName?: 'handleReport' }
    : UseContractWriteConfig<
        typeof iReportHandlerABI,
        'handleReport',
        TMode
      > & {
        abi?: never
        functionName?: 'handleReport'
      } = {} as any,
) {
  return useContractWrite<typeof iReportHandlerABI, 'handleReport', TMode>({
    abi: iReportHandlerABI,
    functionName: 'handleReport',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iReportHandlerABI}__.
 */
export function usePrepareIReportHandlerWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iReportHandlerABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iReportHandlerABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iReportHandlerABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iReportHandlerABI}__ and `functionName` set to `"handleReport"`.
 */
export function usePrepareIReportHandlerHandleReport(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iReportHandlerABI, 'handleReport'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iReportHandlerABI,
    functionName: 'handleReport',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iReportHandlerABI, 'handleReport'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iVerifierProxyABI}__.
 */
export function useIVerifierProxyRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iVerifierProxyABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iVerifierProxyABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iVerifierProxyABI,
    ...config,
  } as UseContractReadConfig<
    typeof iVerifierProxyABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iVerifierProxyABI}__ and `functionName` set to `"s_feeManager"`.
 */
export function useIVerifierProxySFeeManager<
  TFunctionName extends 's_feeManager',
  TSelectData = ReadContractResult<typeof iVerifierProxyABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iVerifierProxyABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iVerifierProxyABI,
    functionName: 's_feeManager',
    ...config,
  } as UseContractReadConfig<
    typeof iVerifierProxyABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iVerifierProxyABI}__.
 */
export function useIVerifierProxyWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iVerifierProxyABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iVerifierProxyABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iVerifierProxyABI, TFunctionName, TMode>({
    abi: iVerifierProxyABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iVerifierProxyABI}__ and `functionName` set to `"verify"`.
 */
export function useIVerifierProxyVerify<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iVerifierProxyABI,
          'verify'
        >['request']['abi'],
        'verify',
        TMode
      > & { functionName?: 'verify' }
    : UseContractWriteConfig<typeof iVerifierProxyABI, 'verify', TMode> & {
        abi?: never
        functionName?: 'verify'
      } = {} as any,
) {
  return useContractWrite<typeof iVerifierProxyABI, 'verify', TMode>({
    abi: iVerifierProxyABI,
    functionName: 'verify',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iVerifierProxyABI}__.
 */
export function usePrepareIVerifierProxyWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iVerifierProxyABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iVerifierProxyABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iVerifierProxyABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iVerifierProxyABI}__ and `functionName` set to `"verify"`.
 */
export function usePrepareIVerifierProxyVerify(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iVerifierProxyABI, 'verify'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iVerifierProxyABI,
    functionName: 'verify',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iVerifierProxyABI, 'verify'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link intermediaryABI}__.
 */
export function useIntermediaryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof intermediaryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof intermediaryABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: intermediaryABI,
    ...config,
  } as UseContractReadConfig<
    typeof intermediaryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link intermediaryABI}__ and `functionName` set to `"getPayments"`.
 */
export function useIntermediaryGetPayments<
  TFunctionName extends 'getPayments',
  TSelectData = ReadContractResult<typeof intermediaryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof intermediaryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: intermediaryABI,
    functionName: 'getPayments',
    ...config,
  } as UseContractReadConfig<
    typeof intermediaryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link intermediaryABI}__ and `functionName` set to `"owner"`.
 */
export function useIntermediaryOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof intermediaryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof intermediaryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: intermediaryABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof intermediaryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link intermediaryABI}__.
 */
export function useIntermediaryWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof intermediaryABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof intermediaryABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof intermediaryABI, TFunctionName, TMode>({
    abi: intermediaryABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link intermediaryABI}__ and `functionName` set to `"makeFirstPayment"`.
 */
export function useIntermediaryMakeFirstPayment<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof intermediaryABI,
          'makeFirstPayment'
        >['request']['abi'],
        'makeFirstPayment',
        TMode
      > & { functionName?: 'makeFirstPayment' }
    : UseContractWriteConfig<
        typeof intermediaryABI,
        'makeFirstPayment',
        TMode
      > & {
        abi?: never
        functionName?: 'makeFirstPayment'
      } = {} as any,
) {
  return useContractWrite<typeof intermediaryABI, 'makeFirstPayment', TMode>({
    abi: intermediaryABI,
    functionName: 'makeFirstPayment',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link intermediaryABI}__ and `functionName` set to `"makeFullPayment"`.
 */
export function useIntermediaryMakeFullPayment<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof intermediaryABI,
          'makeFullPayment'
        >['request']['abi'],
        'makeFullPayment',
        TMode
      > & { functionName?: 'makeFullPayment' }
    : UseContractWriteConfig<
        typeof intermediaryABI,
        'makeFullPayment',
        TMode
      > & {
        abi?: never
        functionName?: 'makeFullPayment'
      } = {} as any,
) {
  return useContractWrite<typeof intermediaryABI, 'makeFullPayment', TMode>({
    abi: intermediaryABI,
    functionName: 'makeFullPayment',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link intermediaryABI}__ and `functionName` set to `"makeScheduledPayment"`.
 */
export function useIntermediaryMakeScheduledPayment<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof intermediaryABI,
          'makeScheduledPayment'
        >['request']['abi'],
        'makeScheduledPayment',
        TMode
      > & { functionName?: 'makeScheduledPayment' }
    : UseContractWriteConfig<
        typeof intermediaryABI,
        'makeScheduledPayment',
        TMode
      > & {
        abi?: never
        functionName?: 'makeScheduledPayment'
      } = {} as any,
) {
  return useContractWrite<
    typeof intermediaryABI,
    'makeScheduledPayment',
    TMode
  >({
    abi: intermediaryABI,
    functionName: 'makeScheduledPayment',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link intermediaryABI}__ and `functionName` set to `"withdawFullFunds"`.
 */
export function useIntermediaryWithdawFullFunds<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof intermediaryABI,
          'withdawFullFunds'
        >['request']['abi'],
        'withdawFullFunds',
        TMode
      > & { functionName?: 'withdawFullFunds' }
    : UseContractWriteConfig<
        typeof intermediaryABI,
        'withdawFullFunds',
        TMode
      > & {
        abi?: never
        functionName?: 'withdawFullFunds'
      } = {} as any,
) {
  return useContractWrite<typeof intermediaryABI, 'withdawFullFunds', TMode>({
    abi: intermediaryABI,
    functionName: 'withdawFullFunds',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link intermediaryABI}__ and `functionName` set to `"withdawFunds"`.
 */
export function useIntermediaryWithdawFunds<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof intermediaryABI,
          'withdawFunds'
        >['request']['abi'],
        'withdawFunds',
        TMode
      > & { functionName?: 'withdawFunds' }
    : UseContractWriteConfig<typeof intermediaryABI, 'withdawFunds', TMode> & {
        abi?: never
        functionName?: 'withdawFunds'
      } = {} as any,
) {
  return useContractWrite<typeof intermediaryABI, 'withdawFunds', TMode>({
    abi: intermediaryABI,
    functionName: 'withdawFunds',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link intermediaryABI}__.
 */
export function usePrepareIntermediaryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof intermediaryABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: intermediaryABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof intermediaryABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link intermediaryABI}__ and `functionName` set to `"makeFirstPayment"`.
 */
export function usePrepareIntermediaryMakeFirstPayment(
  config: Omit<
    UsePrepareContractWriteConfig<typeof intermediaryABI, 'makeFirstPayment'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: intermediaryABI,
    functionName: 'makeFirstPayment',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof intermediaryABI,
    'makeFirstPayment'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link intermediaryABI}__ and `functionName` set to `"makeFullPayment"`.
 */
export function usePrepareIntermediaryMakeFullPayment(
  config: Omit<
    UsePrepareContractWriteConfig<typeof intermediaryABI, 'makeFullPayment'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: intermediaryABI,
    functionName: 'makeFullPayment',
    ...config,
  } as UsePrepareContractWriteConfig<typeof intermediaryABI, 'makeFullPayment'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link intermediaryABI}__ and `functionName` set to `"makeScheduledPayment"`.
 */
export function usePrepareIntermediaryMakeScheduledPayment(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof intermediaryABI,
      'makeScheduledPayment'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: intermediaryABI,
    functionName: 'makeScheduledPayment',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof intermediaryABI,
    'makeScheduledPayment'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link intermediaryABI}__ and `functionName` set to `"withdawFullFunds"`.
 */
export function usePrepareIntermediaryWithdawFullFunds(
  config: Omit<
    UsePrepareContractWriteConfig<typeof intermediaryABI, 'withdawFullFunds'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: intermediaryABI,
    functionName: 'withdawFullFunds',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof intermediaryABI,
    'withdawFullFunds'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link intermediaryABI}__ and `functionName` set to `"withdawFunds"`.
 */
export function usePrepareIntermediaryWithdawFunds(
  config: Omit<
    UsePrepareContractWriteConfig<typeof intermediaryABI, 'withdawFunds'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: intermediaryABI,
    functionName: 'withdawFunds',
    ...config,
  } as UsePrepareContractWriteConfig<typeof intermediaryABI, 'withdawFunds'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link intermediaryABI}__.
 */
export function useIntermediaryEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof intermediaryABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: intermediaryABI,
    ...config,
  } as UseContractEventConfig<typeof intermediaryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link intermediaryABI}__ and `eventName` set to `"PaymentDeposit"`.
 */
export function useIntermediaryPaymentDepositEvent(
  config: Omit<
    UseContractEventConfig<typeof intermediaryABI, 'PaymentDeposit'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: intermediaryABI,
    eventName: 'PaymentDeposit',
    ...config,
  } as UseContractEventConfig<typeof intermediaryABI, 'PaymentDeposit'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link intermediaryABI}__ and `eventName` set to `"PaymentWithdrew"`.
 */
export function useIntermediaryPaymentWithdrewEvent(
  config: Omit<
    UseContractEventConfig<typeof intermediaryABI, 'PaymentWithdrew'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: intermediaryABI,
    eventName: 'PaymentWithdrew',
    ...config,
  } as UseContractEventConfig<typeof intermediaryABI, 'PaymentWithdrew'>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link logEmitterABI}__.
 */
export function useLogEmitterWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof logEmitterABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof logEmitterABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof logEmitterABI, TFunctionName, TMode>({
    abi: logEmitterABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link logEmitterABI}__ and `functionName` set to `"emitLog"`.
 */
export function useLogEmitterEmitLog<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof logEmitterABI,
          'emitLog'
        >['request']['abi'],
        'emitLog',
        TMode
      > & { functionName?: 'emitLog' }
    : UseContractWriteConfig<typeof logEmitterABI, 'emitLog', TMode> & {
        abi?: never
        functionName?: 'emitLog'
      } = {} as any,
) {
  return useContractWrite<typeof logEmitterABI, 'emitLog', TMode>({
    abi: logEmitterABI,
    functionName: 'emitLog',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link logEmitterABI}__.
 */
export function usePrepareLogEmitterWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof logEmitterABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: logEmitterABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof logEmitterABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link logEmitterABI}__ and `functionName` set to `"emitLog"`.
 */
export function usePrepareLogEmitterEmitLog(
  config: Omit<
    UsePrepareContractWriteConfig<typeof logEmitterABI, 'emitLog'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: logEmitterABI,
    functionName: 'emitLog',
    ...config,
  } as UsePrepareContractWriteConfig<typeof logEmitterABI, 'emitLog'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link logEmitterABI}__.
 */
export function useLogEmitterEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof logEmitterABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: logEmitterABI,
    ...config,
  } as UseContractEventConfig<typeof logEmitterABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link logEmitterABI}__ and `eventName` set to `"Log"`.
 */
export function useLogEmitterLogEvent(
  config: Omit<
    UseContractEventConfig<typeof logEmitterABI, 'Log'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: logEmitterABI,
    eventName: 'Log',
    ...config,
  } as UseContractEventConfig<typeof logEmitterABI, 'Log'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link managerABI}__.
 */
export function useManagerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof managerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof managerABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: managerABI,
    ...config,
  } as UseContractReadConfig<typeof managerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"calculatePriceEth"`.
 */
export function useManagerCalculatePriceEth<
  TFunctionName extends 'calculatePriceEth',
  TSelectData = ReadContractResult<typeof managerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof managerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: managerABI,
    functionName: 'calculatePriceEth',
    ...config,
  } as UseContractReadConfig<typeof managerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"owner"`.
 */
export function useManagerOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof managerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof managerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: managerABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof managerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link managerABI}__.
 */
export function useManagerWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof managerABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof managerABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof managerABI, TFunctionName, TMode>({
    abi: managerABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"acceptListing"`.
 */
export function useManagerAcceptListing<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof managerABI,
          'acceptListing'
        >['request']['abi'],
        'acceptListing',
        TMode
      > & { functionName?: 'acceptListing' }
    : UseContractWriteConfig<typeof managerABI, 'acceptListing', TMode> & {
        abi?: never
        functionName?: 'acceptListing'
      } = {} as any,
) {
  return useContractWrite<typeof managerABI, 'acceptListing', TMode>({
    abi: managerABI,
    functionName: 'acceptListing',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"addPropertyETH"`.
 */
export function useManagerAddPropertyEth<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof managerABI,
          'addPropertyETH'
        >['request']['abi'],
        'addPropertyETH',
        TMode
      > & { functionName?: 'addPropertyETH' }
    : UseContractWriteConfig<typeof managerABI, 'addPropertyETH', TMode> & {
        abi?: never
        functionName?: 'addPropertyETH'
      } = {} as any,
) {
  return useContractWrite<typeof managerABI, 'addPropertyETH', TMode>({
    abi: managerABI,
    functionName: 'addPropertyETH',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"addPropertyUSDC"`.
 */
export function useManagerAddPropertyUsdc<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof managerABI,
          'addPropertyUSDC'
        >['request']['abi'],
        'addPropertyUSDC',
        TMode
      > & { functionName?: 'addPropertyUSDC' }
    : UseContractWriteConfig<typeof managerABI, 'addPropertyUSDC', TMode> & {
        abi?: never
        functionName?: 'addPropertyUSDC'
      } = {} as any,
) {
  return useContractWrite<typeof managerABI, 'addPropertyUSDC', TMode>({
    abi: managerABI,
    functionName: 'addPropertyUSDC',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"createListingETH"`.
 */
export function useManagerCreateListingEth<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof managerABI,
          'createListingETH'
        >['request']['abi'],
        'createListingETH',
        TMode
      > & { functionName?: 'createListingETH' }
    : UseContractWriteConfig<typeof managerABI, 'createListingETH', TMode> & {
        abi?: never
        functionName?: 'createListingETH'
      } = {} as any,
) {
  return useContractWrite<typeof managerABI, 'createListingETH', TMode>({
    abi: managerABI,
    functionName: 'createListingETH',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"createListingUSDC"`.
 */
export function useManagerCreateListingUsdc<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof managerABI,
          'createListingUSDC'
        >['request']['abi'],
        'createListingUSDC',
        TMode
      > & { functionName?: 'createListingUSDC' }
    : UseContractWriteConfig<typeof managerABI, 'createListingUSDC', TMode> & {
        abi?: never
        functionName?: 'createListingUSDC'
      } = {} as any,
) {
  return useContractWrite<typeof managerABI, 'createListingUSDC', TMode>({
    abi: managerABI,
    functionName: 'createListingUSDC',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"initialize"`.
 */
export function useManagerInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof managerABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof managerABI, 'initialize', TMode> & {
        abi?: never
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof managerABI, 'initialize', TMode>({
    abi: managerABI,
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"payFullRent"`.
 */
export function useManagerPayFullRent<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof managerABI,
          'payFullRent'
        >['request']['abi'],
        'payFullRent',
        TMode
      > & { functionName?: 'payFullRent' }
    : UseContractWriteConfig<typeof managerABI, 'payFullRent', TMode> & {
        abi?: never
        functionName?: 'payFullRent'
      } = {} as any,
) {
  return useContractWrite<typeof managerABI, 'payFullRent', TMode>({
    abi: managerABI,
    functionName: 'payFullRent',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"payRent"`.
 */
export function useManagerPayRent<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof managerABI,
          'payRent'
        >['request']['abi'],
        'payRent',
        TMode
      > & { functionName?: 'payRent' }
    : UseContractWriteConfig<typeof managerABI, 'payRent', TMode> & {
        abi?: never
        functionName?: 'payRent'
      } = {} as any,
) {
  return useContractWrite<typeof managerABI, 'payRent', TMode>({
    abi: managerABI,
    functionName: 'payRent',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"receiveFullFunds"`.
 */
export function useManagerReceiveFullFunds<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof managerABI,
          'receiveFullFunds'
        >['request']['abi'],
        'receiveFullFunds',
        TMode
      > & { functionName?: 'receiveFullFunds' }
    : UseContractWriteConfig<typeof managerABI, 'receiveFullFunds', TMode> & {
        abi?: never
        functionName?: 'receiveFullFunds'
      } = {} as any,
) {
  return useContractWrite<typeof managerABI, 'receiveFullFunds', TMode>({
    abi: managerABI,
    functionName: 'receiveFullFunds',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"receiveFunds"`.
 */
export function useManagerReceiveFunds<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof managerABI,
          'receiveFunds'
        >['request']['abi'],
        'receiveFunds',
        TMode
      > & { functionName?: 'receiveFunds' }
    : UseContractWriteConfig<typeof managerABI, 'receiveFunds', TMode> & {
        abi?: never
        functionName?: 'receiveFunds'
      } = {} as any,
) {
  return useContractWrite<typeof managerABI, 'receiveFunds', TMode>({
    abi: managerABI,
    functionName: 'receiveFunds',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"signAgreement"`.
 */
export function useManagerSignAgreement<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof managerABI,
          'signAgreement'
        >['request']['abi'],
        'signAgreement',
        TMode
      > & { functionName?: 'signAgreement' }
    : UseContractWriteConfig<typeof managerABI, 'signAgreement', TMode> & {
        abi?: never
        functionName?: 'signAgreement'
      } = {} as any,
) {
  return useContractWrite<typeof managerABI, 'signAgreement', TMode>({
    abi: managerABI,
    functionName: 'signAgreement',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"startRent"`.
 */
export function useManagerStartRent<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof managerABI,
          'startRent'
        >['request']['abi'],
        'startRent',
        TMode
      > & { functionName?: 'startRent' }
    : UseContractWriteConfig<typeof managerABI, 'startRent', TMode> & {
        abi?: never
        functionName?: 'startRent'
      } = {} as any,
) {
  return useContractWrite<typeof managerABI, 'startRent', TMode>({
    abi: managerABI,
    functionName: 'startRent',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link managerABI}__.
 */
export function usePrepareManagerWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof managerABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: managerABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof managerABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"acceptListing"`.
 */
export function usePrepareManagerAcceptListing(
  config: Omit<
    UsePrepareContractWriteConfig<typeof managerABI, 'acceptListing'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: managerABI,
    functionName: 'acceptListing',
    ...config,
  } as UsePrepareContractWriteConfig<typeof managerABI, 'acceptListing'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"addPropertyETH"`.
 */
export function usePrepareManagerAddPropertyEth(
  config: Omit<
    UsePrepareContractWriteConfig<typeof managerABI, 'addPropertyETH'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: managerABI,
    functionName: 'addPropertyETH',
    ...config,
  } as UsePrepareContractWriteConfig<typeof managerABI, 'addPropertyETH'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"addPropertyUSDC"`.
 */
export function usePrepareManagerAddPropertyUsdc(
  config: Omit<
    UsePrepareContractWriteConfig<typeof managerABI, 'addPropertyUSDC'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: managerABI,
    functionName: 'addPropertyUSDC',
    ...config,
  } as UsePrepareContractWriteConfig<typeof managerABI, 'addPropertyUSDC'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"createListingETH"`.
 */
export function usePrepareManagerCreateListingEth(
  config: Omit<
    UsePrepareContractWriteConfig<typeof managerABI, 'createListingETH'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: managerABI,
    functionName: 'createListingETH',
    ...config,
  } as UsePrepareContractWriteConfig<typeof managerABI, 'createListingETH'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"createListingUSDC"`.
 */
export function usePrepareManagerCreateListingUsdc(
  config: Omit<
    UsePrepareContractWriteConfig<typeof managerABI, 'createListingUSDC'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: managerABI,
    functionName: 'createListingUSDC',
    ...config,
  } as UsePrepareContractWriteConfig<typeof managerABI, 'createListingUSDC'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareManagerInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof managerABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: managerABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof managerABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"payFullRent"`.
 */
export function usePrepareManagerPayFullRent(
  config: Omit<
    UsePrepareContractWriteConfig<typeof managerABI, 'payFullRent'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: managerABI,
    functionName: 'payFullRent',
    ...config,
  } as UsePrepareContractWriteConfig<typeof managerABI, 'payFullRent'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"payRent"`.
 */
export function usePrepareManagerPayRent(
  config: Omit<
    UsePrepareContractWriteConfig<typeof managerABI, 'payRent'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: managerABI,
    functionName: 'payRent',
    ...config,
  } as UsePrepareContractWriteConfig<typeof managerABI, 'payRent'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"receiveFullFunds"`.
 */
export function usePrepareManagerReceiveFullFunds(
  config: Omit<
    UsePrepareContractWriteConfig<typeof managerABI, 'receiveFullFunds'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: managerABI,
    functionName: 'receiveFullFunds',
    ...config,
  } as UsePrepareContractWriteConfig<typeof managerABI, 'receiveFullFunds'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"receiveFunds"`.
 */
export function usePrepareManagerReceiveFunds(
  config: Omit<
    UsePrepareContractWriteConfig<typeof managerABI, 'receiveFunds'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: managerABI,
    functionName: 'receiveFunds',
    ...config,
  } as UsePrepareContractWriteConfig<typeof managerABI, 'receiveFunds'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"signAgreement"`.
 */
export function usePrepareManagerSignAgreement(
  config: Omit<
    UsePrepareContractWriteConfig<typeof managerABI, 'signAgreement'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: managerABI,
    functionName: 'signAgreement',
    ...config,
  } as UsePrepareContractWriteConfig<typeof managerABI, 'signAgreement'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link managerABI}__ and `functionName` set to `"startRent"`.
 */
export function usePrepareManagerStartRent(
  config: Omit<
    UsePrepareContractWriteConfig<typeof managerABI, 'startRent'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: managerABI,
    functionName: 'startRent',
    ...config,
  } as UsePrepareContractWriteConfig<typeof managerABI, 'startRent'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link managerABI}__.
 */
export function useManagerEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof managerABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: managerABI,
    ...config,
  } as UseContractEventConfig<typeof managerABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link managerABI}__ and `eventName` set to `"Initialized"`.
 */
export function useManagerInitializedEvent(
  config: Omit<
    UseContractEventConfig<typeof managerABI, 'Initialized'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: managerABI,
    eventName: 'Initialized',
    ...config,
  } as UseContractEventConfig<typeof managerABI, 'Initialized'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceABI}__.
 */
export function useMarketplaceRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof marketplaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceABI,
    ...config,
  } as UseContractReadConfig<typeof marketplaceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceABI}__ and `functionName` set to `"getActiveProperty"`.
 */
export function useMarketplaceGetActiveProperty<
  TFunctionName extends 'getActiveProperty',
  TSelectData = ReadContractResult<typeof marketplaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceABI,
    functionName: 'getActiveProperty',
    ...config,
  } as UseContractReadConfig<typeof marketplaceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceABI}__ and `functionName` set to `"getListing"`.
 */
export function useMarketplaceGetListing<
  TFunctionName extends 'getListing',
  TSelectData = ReadContractResult<typeof marketplaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceABI,
    functionName: 'getListing',
    ...config,
  } as UseContractReadConfig<typeof marketplaceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceABI}__ and `functionName` set to `"getListingWithData"`.
 */
export function useMarketplaceGetListingWithData<
  TFunctionName extends 'getListingWithData',
  TSelectData = ReadContractResult<typeof marketplaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceABI,
    functionName: 'getListingWithData',
    ...config,
  } as UseContractReadConfig<typeof marketplaceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketplaceABI}__ and `functionName` set to `"owner"`.
 */
export function useMarketplaceOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof marketplaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketplaceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: marketplaceABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof marketplaceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketplaceABI}__.
 */
export function useMarketplaceWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketplaceABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof marketplaceABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof marketplaceABI, TFunctionName, TMode>({
    abi: marketplaceABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketplaceABI}__ and `functionName` set to `"acceptListing"`.
 */
export function useMarketplaceAcceptListing<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketplaceABI,
          'acceptListing'
        >['request']['abi'],
        'acceptListing',
        TMode
      > & { functionName?: 'acceptListing' }
    : UseContractWriteConfig<typeof marketplaceABI, 'acceptListing', TMode> & {
        abi?: never
        functionName?: 'acceptListing'
      } = {} as any,
) {
  return useContractWrite<typeof marketplaceABI, 'acceptListing', TMode>({
    abi: marketplaceABI,
    functionName: 'acceptListing',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketplaceABI}__ and `functionName` set to `"createListing"`.
 */
export function useMarketplaceCreateListing<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketplaceABI,
          'createListing'
        >['request']['abi'],
        'createListing',
        TMode
      > & { functionName?: 'createListing' }
    : UseContractWriteConfig<typeof marketplaceABI, 'createListing', TMode> & {
        abi?: never
        functionName?: 'createListing'
      } = {} as any,
) {
  return useContractWrite<typeof marketplaceABI, 'createListing', TMode>({
    abi: marketplaceABI,
    functionName: 'createListing',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketplaceABI}__ and `functionName` set to `"finishListing"`.
 */
export function useMarketplaceFinishListing<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketplaceABI,
          'finishListing'
        >['request']['abi'],
        'finishListing',
        TMode
      > & { functionName?: 'finishListing' }
    : UseContractWriteConfig<typeof marketplaceABI, 'finishListing', TMode> & {
        abi?: never
        functionName?: 'finishListing'
      } = {} as any,
) {
  return useContractWrite<typeof marketplaceABI, 'finishListing', TMode>({
    abi: marketplaceABI,
    functionName: 'finishListing',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketplaceABI}__.
 */
export function usePrepareMarketplaceWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof marketplaceABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketplaceABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof marketplaceABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketplaceABI}__ and `functionName` set to `"acceptListing"`.
 */
export function usePrepareMarketplaceAcceptListing(
  config: Omit<
    UsePrepareContractWriteConfig<typeof marketplaceABI, 'acceptListing'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketplaceABI,
    functionName: 'acceptListing',
    ...config,
  } as UsePrepareContractWriteConfig<typeof marketplaceABI, 'acceptListing'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketplaceABI}__ and `functionName` set to `"createListing"`.
 */
export function usePrepareMarketplaceCreateListing(
  config: Omit<
    UsePrepareContractWriteConfig<typeof marketplaceABI, 'createListing'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketplaceABI,
    functionName: 'createListing',
    ...config,
  } as UsePrepareContractWriteConfig<typeof marketplaceABI, 'createListing'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketplaceABI}__ and `functionName` set to `"finishListing"`.
 */
export function usePrepareMarketplaceFinishListing(
  config: Omit<
    UsePrepareContractWriteConfig<typeof marketplaceABI, 'finishListing'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketplaceABI,
    functionName: 'finishListing',
    ...config,
  } as UsePrepareContractWriteConfig<typeof marketplaceABI, 'finishListing'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link marketplaceABI}__.
 */
export function useMarketplaceEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof marketplaceABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: marketplaceABI,
    ...config,
  } as UseContractEventConfig<typeof marketplaceABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link marketplaceABI}__ and `eventName` set to `"ListingAccepted"`.
 */
export function useMarketplaceListingAcceptedEvent(
  config: Omit<
    UseContractEventConfig<typeof marketplaceABI, 'ListingAccepted'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: marketplaceABI,
    eventName: 'ListingAccepted',
    ...config,
  } as UseContractEventConfig<typeof marketplaceABI, 'ListingAccepted'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link marketplaceABI}__ and `eventName` set to `"ListingCreated"`.
 */
export function useMarketplaceListingCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof marketplaceABI, 'ListingCreated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: marketplaceABI,
    eventName: 'ListingCreated',
    ...config,
  } as UseContractEventConfig<typeof marketplaceABI, 'ListingCreated'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ownableABI}__.
 */
export function useOwnableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ownableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ownableABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ownableABI,
    ...config,
  } as UseContractReadConfig<typeof ownableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"owner"`.
 */
export function useOwnableOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof ownableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ownableABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ownableABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof ownableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link registryABI}__.
 */
export function useRegistryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof registryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof registryABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: registryABI,
    ...config,
  } as UseContractReadConfig<typeof registryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link registryABI}__ and `functionName` set to `"getIsHashUsed"`.
 */
export function useRegistryGetIsHashUsed<
  TFunctionName extends 'getIsHashUsed',
  TSelectData = ReadContractResult<typeof registryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof registryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: registryABI,
    functionName: 'getIsHashUsed',
    ...config,
  } as UseContractReadConfig<typeof registryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link registryABI}__ and `functionName` set to `"getProperty"`.
 */
export function useRegistryGetProperty<
  TFunctionName extends 'getProperty',
  TSelectData = ReadContractResult<typeof registryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof registryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: registryABI,
    functionName: 'getProperty',
    ...config,
  } as UseContractReadConfig<typeof registryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link registryABI}__ and `functionName` set to `"getPropertyByOwner"`.
 */
export function useRegistryGetPropertyByOwner<
  TFunctionName extends 'getPropertyByOwner',
  TSelectData = ReadContractResult<typeof registryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof registryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: registryABI,
    functionName: 'getPropertyByOwner',
    ...config,
  } as UseContractReadConfig<typeof registryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link registryABI}__ and `functionName` set to `"owner"`.
 */
export function useRegistryOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof registryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof registryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: registryABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof registryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link registryABI}__.
 */
export function useRegistryWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof registryABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof registryABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof registryABI, TFunctionName, TMode>({
    abi: registryABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link registryABI}__ and `functionName` set to `"addProperty"`.
 */
export function useRegistryAddProperty<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof registryABI,
          'addProperty'
        >['request']['abi'],
        'addProperty',
        TMode
      > & { functionName?: 'addProperty' }
    : UseContractWriteConfig<typeof registryABI, 'addProperty', TMode> & {
        abi?: never
        functionName?: 'addProperty'
      } = {} as any,
) {
  return useContractWrite<typeof registryABI, 'addProperty', TMode>({
    abi: registryABI,
    functionName: 'addProperty',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link registryABI}__.
 */
export function usePrepareRegistryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof registryABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: registryABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof registryABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link registryABI}__ and `functionName` set to `"addProperty"`.
 */
export function usePrepareRegistryAddProperty(
  config: Omit<
    UsePrepareContractWriteConfig<typeof registryABI, 'addProperty'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: registryABI,
    functionName: 'addProperty',
    ...config,
  } as UsePrepareContractWriteConfig<typeof registryABI, 'addProperty'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link registryABI}__.
 */
export function useRegistryEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof registryABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: registryABI,
    ...config,
  } as UseContractEventConfig<typeof registryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link registryABI}__ and `eventName` set to `"PropertyAdded"`.
 */
export function useRegistryPropertyAddedEvent(
  config: Omit<
    UseContractEventConfig<typeof registryABI, 'PropertyAdded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: registryABI,
    eventName: 'PropertyAdded',
    ...config,
  } as UseContractEventConfig<typeof registryABI, 'PropertyAdded'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link streamsLookupChainlinkAutomationABI}__.
 */
export function useStreamsLookupChainlinkAutomationRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<
    typeof streamsLookupChainlinkAutomationABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof streamsLookupChainlinkAutomationABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: streamsLookupChainlinkAutomationABI,
    ...config,
  } as UseContractReadConfig<
    typeof streamsLookupChainlinkAutomationABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link streamsLookupChainlinkAutomationABI}__ and `functionName` set to `"FEE_ADDRESS"`.
 */
export function useStreamsLookupChainlinkAutomationFeeAddress<
  TFunctionName extends 'FEE_ADDRESS',
  TSelectData = ReadContractResult<
    typeof streamsLookupChainlinkAutomationABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof streamsLookupChainlinkAutomationABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: streamsLookupChainlinkAutomationABI,
    functionName: 'FEE_ADDRESS',
    ...config,
  } as UseContractReadConfig<
    typeof streamsLookupChainlinkAutomationABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link streamsLookupChainlinkAutomationABI}__ and `functionName` set to `"STRING_DATASTREAMS_FEEDLABEL"`.
 */
export function useStreamsLookupChainlinkAutomationStringDatastreamsFeedlabel<
  TFunctionName extends 'STRING_DATASTREAMS_FEEDLABEL',
  TSelectData = ReadContractResult<
    typeof streamsLookupChainlinkAutomationABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof streamsLookupChainlinkAutomationABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: streamsLookupChainlinkAutomationABI,
    functionName: 'STRING_DATASTREAMS_FEEDLABEL',
    ...config,
  } as UseContractReadConfig<
    typeof streamsLookupChainlinkAutomationABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link streamsLookupChainlinkAutomationABI}__ and `functionName` set to `"STRING_DATASTREAMS_QUERYLABEL"`.
 */
export function useStreamsLookupChainlinkAutomationStringDatastreamsQuerylabel<
  TFunctionName extends 'STRING_DATASTREAMS_QUERYLABEL',
  TSelectData = ReadContractResult<
    typeof streamsLookupChainlinkAutomationABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof streamsLookupChainlinkAutomationABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: streamsLookupChainlinkAutomationABI,
    functionName: 'STRING_DATASTREAMS_QUERYLABEL',
    ...config,
  } as UseContractReadConfig<
    typeof streamsLookupChainlinkAutomationABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link streamsLookupChainlinkAutomationABI}__ and `functionName` set to `"checkCallback"`.
 */
export function useStreamsLookupChainlinkAutomationCheckCallback<
  TFunctionName extends 'checkCallback',
  TSelectData = ReadContractResult<
    typeof streamsLookupChainlinkAutomationABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof streamsLookupChainlinkAutomationABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: streamsLookupChainlinkAutomationABI,
    functionName: 'checkCallback',
    ...config,
  } as UseContractReadConfig<
    typeof streamsLookupChainlinkAutomationABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link streamsLookupChainlinkAutomationABI}__ and `functionName` set to `"feedIds"`.
 */
export function useStreamsLookupChainlinkAutomationFeedIds<
  TFunctionName extends 'feedIds',
  TSelectData = ReadContractResult<
    typeof streamsLookupChainlinkAutomationABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof streamsLookupChainlinkAutomationABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: streamsLookupChainlinkAutomationABI,
    functionName: 'feedIds',
    ...config,
  } as UseContractReadConfig<
    typeof streamsLookupChainlinkAutomationABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link streamsLookupChainlinkAutomationABI}__ and `functionName` set to `"latestETHUSDPrice"`.
 */
export function useStreamsLookupChainlinkAutomationLatestEthusdPrice<
  TFunctionName extends 'latestETHUSDPrice',
  TSelectData = ReadContractResult<
    typeof streamsLookupChainlinkAutomationABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof streamsLookupChainlinkAutomationABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: streamsLookupChainlinkAutomationABI,
    functionName: 'latestETHUSDPrice',
    ...config,
  } as UseContractReadConfig<
    typeof streamsLookupChainlinkAutomationABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link streamsLookupChainlinkAutomationABI}__ and `functionName` set to `"verifier"`.
 */
export function useStreamsLookupChainlinkAutomationVerifier<
  TFunctionName extends 'verifier',
  TSelectData = ReadContractResult<
    typeof streamsLookupChainlinkAutomationABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof streamsLookupChainlinkAutomationABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: streamsLookupChainlinkAutomationABI,
    functionName: 'verifier',
    ...config,
  } as UseContractReadConfig<
    typeof streamsLookupChainlinkAutomationABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link streamsLookupChainlinkAutomationABI}__.
 */
export function useStreamsLookupChainlinkAutomationWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof streamsLookupChainlinkAutomationABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof streamsLookupChainlinkAutomationABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<
    typeof streamsLookupChainlinkAutomationABI,
    TFunctionName,
    TMode
  >({ abi: streamsLookupChainlinkAutomationABI, ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link streamsLookupChainlinkAutomationABI}__ and `functionName` set to `"checkLog"`.
 */
export function useStreamsLookupChainlinkAutomationCheckLog<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof streamsLookupChainlinkAutomationABI,
          'checkLog'
        >['request']['abi'],
        'checkLog',
        TMode
      > & { functionName?: 'checkLog' }
    : UseContractWriteConfig<
        typeof streamsLookupChainlinkAutomationABI,
        'checkLog',
        TMode
      > & {
        abi?: never
        functionName?: 'checkLog'
      } = {} as any,
) {
  return useContractWrite<
    typeof streamsLookupChainlinkAutomationABI,
    'checkLog',
    TMode
  >({
    abi: streamsLookupChainlinkAutomationABI,
    functionName: 'checkLog',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link streamsLookupChainlinkAutomationABI}__ and `functionName` set to `"performUpkeep"`.
 */
export function useStreamsLookupChainlinkAutomationPerformUpkeep<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof streamsLookupChainlinkAutomationABI,
          'performUpkeep'
        >['request']['abi'],
        'performUpkeep',
        TMode
      > & { functionName?: 'performUpkeep' }
    : UseContractWriteConfig<
        typeof streamsLookupChainlinkAutomationABI,
        'performUpkeep',
        TMode
      > & {
        abi?: never
        functionName?: 'performUpkeep'
      } = {} as any,
) {
  return useContractWrite<
    typeof streamsLookupChainlinkAutomationABI,
    'performUpkeep',
    TMode
  >({
    abi: streamsLookupChainlinkAutomationABI,
    functionName: 'performUpkeep',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link streamsLookupChainlinkAutomationABI}__.
 */
export function usePrepareStreamsLookupChainlinkAutomationWrite<
  TFunctionName extends string,
>(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof streamsLookupChainlinkAutomationABI,
      TFunctionName
    >,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: streamsLookupChainlinkAutomationABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof streamsLookupChainlinkAutomationABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link streamsLookupChainlinkAutomationABI}__ and `functionName` set to `"checkLog"`.
 */
export function usePrepareStreamsLookupChainlinkAutomationCheckLog(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof streamsLookupChainlinkAutomationABI,
      'checkLog'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: streamsLookupChainlinkAutomationABI,
    functionName: 'checkLog',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof streamsLookupChainlinkAutomationABI,
    'checkLog'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link streamsLookupChainlinkAutomationABI}__ and `functionName` set to `"performUpkeep"`.
 */
export function usePrepareStreamsLookupChainlinkAutomationPerformUpkeep(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof streamsLookupChainlinkAutomationABI,
      'performUpkeep'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: streamsLookupChainlinkAutomationABI,
    functionName: 'performUpkeep',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof streamsLookupChainlinkAutomationABI,
    'performUpkeep'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link streamsLookupChainlinkAutomationABI}__.
 */
export function useStreamsLookupChainlinkAutomationEvent<
  TEventName extends string,
>(
  config: Omit<
    UseContractEventConfig<
      typeof streamsLookupChainlinkAutomationABI,
      TEventName
    >,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: streamsLookupChainlinkAutomationABI,
    ...config,
  } as UseContractEventConfig<
    typeof streamsLookupChainlinkAutomationABI,
    TEventName
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link streamsLookupChainlinkAutomationABI}__ and `eventName` set to `"PriceUpdated"`.
 */
export function useStreamsLookupChainlinkAutomationPriceUpdatedEvent(
  config: Omit<
    UseContractEventConfig<
      typeof streamsLookupChainlinkAutomationABI,
      'PriceUpdated'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: streamsLookupChainlinkAutomationABI,
    eventName: 'PriceUpdated',
    ...config,
  } as UseContractEventConfig<
    typeof streamsLookupChainlinkAutomationABI,
    'PriceUpdated'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link streamsLookupCompatibleInterfaceABI}__.
 */
export function useStreamsLookupCompatibleInterfaceRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<
    typeof streamsLookupCompatibleInterfaceABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof streamsLookupCompatibleInterfaceABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: streamsLookupCompatibleInterfaceABI,
    ...config,
  } as UseContractReadConfig<
    typeof streamsLookupCompatibleInterfaceABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link streamsLookupCompatibleInterfaceABI}__ and `functionName` set to `"checkCallback"`.
 */
export function useStreamsLookupCompatibleInterfaceCheckCallback<
  TFunctionName extends 'checkCallback',
  TSelectData = ReadContractResult<
    typeof streamsLookupCompatibleInterfaceABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof streamsLookupCompatibleInterfaceABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: streamsLookupCompatibleInterfaceABI,
    functionName: 'checkCallback',
    ...config,
  } as UseContractReadConfig<
    typeof streamsLookupCompatibleInterfaceABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdcMockABI}__.
 */
export function useUsdcMockRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof usdcMockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof usdcMockABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: usdcMockABI,
    ...config,
  } as UseContractReadConfig<typeof usdcMockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdcMockABI}__ and `functionName` set to `"allowance"`.
 */
export function useUsdcMockAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof usdcMockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof usdcMockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: usdcMockABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof usdcMockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdcMockABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useUsdcMockBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof usdcMockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof usdcMockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: usdcMockABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof usdcMockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdcMockABI}__ and `functionName` set to `"decimals"`.
 */
export function useUsdcMockDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof usdcMockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof usdcMockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: usdcMockABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof usdcMockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdcMockABI}__ and `functionName` set to `"name"`.
 */
export function useUsdcMockName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof usdcMockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof usdcMockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: usdcMockABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof usdcMockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdcMockABI}__ and `functionName` set to `"symbol"`.
 */
export function useUsdcMockSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof usdcMockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof usdcMockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: usdcMockABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof usdcMockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link usdcMockABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useUsdcMockTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof usdcMockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof usdcMockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: usdcMockABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof usdcMockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdcMockABI}__.
 */
export function useUsdcMockWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdcMockABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof usdcMockABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof usdcMockABI, TFunctionName, TMode>({
    abi: usdcMockABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdcMockABI}__ and `functionName` set to `"approve"`.
 */
export function useUsdcMockApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdcMockABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof usdcMockABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof usdcMockABI, 'approve', TMode>({
    abi: usdcMockABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdcMockABI}__ and `functionName` set to `"burn"`.
 */
export function useUsdcMockBurn<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdcMockABI,
          'burn'
        >['request']['abi'],
        'burn',
        TMode
      > & { functionName?: 'burn' }
    : UseContractWriteConfig<typeof usdcMockABI, 'burn', TMode> & {
        abi?: never
        functionName?: 'burn'
      } = {} as any,
) {
  return useContractWrite<typeof usdcMockABI, 'burn', TMode>({
    abi: usdcMockABI,
    functionName: 'burn',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdcMockABI}__ and `functionName` set to `"mint"`.
 */
export function useUsdcMockMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdcMockABI,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof usdcMockABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof usdcMockABI, 'mint', TMode>({
    abi: usdcMockABI,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdcMockABI}__ and `functionName` set to `"transfer"`.
 */
export function useUsdcMockTransfer<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdcMockABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof usdcMockABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof usdcMockABI, 'transfer', TMode>({
    abi: usdcMockABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link usdcMockABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useUsdcMockTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof usdcMockABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof usdcMockABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof usdcMockABI, 'transferFrom', TMode>({
    abi: usdcMockABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdcMockABI}__.
 */
export function usePrepareUsdcMockWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdcMockABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: usdcMockABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdcMockABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdcMockABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareUsdcMockApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdcMockABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: usdcMockABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdcMockABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdcMockABI}__ and `functionName` set to `"burn"`.
 */
export function usePrepareUsdcMockBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdcMockABI, 'burn'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: usdcMockABI,
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdcMockABI, 'burn'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdcMockABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareUsdcMockMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdcMockABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: usdcMockABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdcMockABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdcMockABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareUsdcMockTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdcMockABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: usdcMockABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdcMockABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link usdcMockABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareUsdcMockTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof usdcMockABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: usdcMockABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof usdcMockABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdcMockABI}__.
 */
export function useUsdcMockEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof usdcMockABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: usdcMockABI,
    ...config,
  } as UseContractEventConfig<typeof usdcMockABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdcMockABI}__ and `eventName` set to `"Approval"`.
 */
export function useUsdcMockApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof usdcMockABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: usdcMockABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof usdcMockABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link usdcMockABI}__ and `eventName` set to `"Transfer"`.
 */
export function useUsdcMockTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof usdcMockABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: usdcMockABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof usdcMockABI, 'Transfer'>)
}
