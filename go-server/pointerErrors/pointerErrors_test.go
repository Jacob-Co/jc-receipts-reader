package pointerErrors

import "testing"

func TestWallet(t *testing.T) {
	t.Run("Deposit", func(t *testing.T) {
		wallet := Wallet{}
		wallet.Deposit(Bitcoin(10.0))
		got := wallet.Balance()
		want := Bitcoin(10.0)

		assertBalance(t, got, want)
	})

	t.Run("Withdraw", func(t *testing.T) {
		wallet := Wallet{Bitcoin(50.0)}
		err := wallet.Withdraw(Bitcoin(10.0))
		got := wallet.Balance()
		want := Bitcoin(40.0)

		assertNoError(t, err)
		assertBalance(t, got, want)
	})

	t.Run("Withdraw should return error if amount is greater than balance", func(t *testing.T) {
		startingBalance := Bitcoin(50.0)
		wallet := Wallet{Bitcoin(50.0)}
		exceededWithdraw := Bitcoin(1000.0)
		withdrawErr := wallet.Withdraw(exceededWithdraw)

		assertBalance(t, wallet.Balance(), startingBalance)
		assertError(t, withdrawErr, ErrInsufficientFunds)
	})

}

var assertBalance = func(t *testing.T, got Bitcoin, want Bitcoin) {
	t.Helper()

	if got != want {
		t.Errorf("got %s, want %s", got, want)
	}
}

func assertNoError(t *testing.T, got error) {
	if got != nil {
		t.Fatal("should not get an error")
	}
}

var assertError = func(t *testing.T, got error, want error) {
	t.Helper()

	if got == nil {
		t.Fatal("didn't not get expected error")
	}

	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}
