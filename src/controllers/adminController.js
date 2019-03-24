import accountModel from '../models/bankAccount';

class AdminController {
  static updateAccount(req, res) {
    const { accountNumber } = req.params;
    const { status } = req.body;

    const currentAccount = accountModel.find(account => account.accountNumber === accountNumber);
    if (currentAccount) {
      currentAccount.status = status;
      return res.status(200).json({
        status: '200',
        data: {
          accountNumber,
          account: accountModel.find(account => account.accountNumber === currentAccount.accountNumber),
        },
      });
    }
    return res.status(404).json({
      status: '404',
      error: 'Account not found',
    });
  }

  static deleteAccount(req, res) {
    const { accountNumber } = req.params;
    const currentAccount = accountModel.find(account => account.accountNumber === accountNumber);

    if (!currentAccount) {
      return res.status(404).json({
        status: '404',
        error: 'Account not found',
      });
    }

    const index = accountModel.indexOf(currentAccount);
    accountModel.splice(index, 1);
    return res.status(203).json({
      status: '203',
      message: 'Account successfully deleted',
    });
  }
}
export default AdminController;
