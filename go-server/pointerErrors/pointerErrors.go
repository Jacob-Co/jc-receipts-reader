package pointerErrors

import (
	"errors"
	"fmt"
)

type Stringer interface {
	String() string
}

type Bitcoin float64

func (b Bitcoin) String() string {
	return fmt.Sprintf("BTC %f", b)
}

type Wallet struct {
	balance Bitcoin
}

func (w *Wallet) Deposit(amt Bitcoin) {
	w.balance += amt
}

var ErrInsufficientFunds = errors.New("Insufficient Balance")

func (w *Wallet) Withdraw(amt Bitcoin) error {
	if w.balance < amt {
		return ErrInsufficientFunds
	}
	w.balance -= amt
	return nil
}

func (w *Wallet) Balance() Bitcoin {
	return w.balance
}
