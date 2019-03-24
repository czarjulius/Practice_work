import accountModel from '../models/bankAccount';

class AdminController {
  static updateAccount(req, res) {
    const { accountNumber } = req.params;
    const { status } = req.body;

    const { isAdmin } = req.userData;

    if (isAdmin) {
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
    return res.status(403).json({
      status: '403',
      error: 'You are not an Admin',
    });
  }
}
export default AdminController;
