import LoggingUtil from './LoggingUtil';

describe('LoggingUtil', () => {
  describe('#isMetaMessage', () => {
    describe('when the message is missing', () => {
      it('should return false', (done) => {
        const meta = LoggingUtil.isMetaMessage();
        expect(meta).toEqual(false);
        done();
      });
    });
    describe('when the message contains empty meta', () => {
      it('should return false', (done) => {
        const meta = LoggingUtil.isMetaMessage({ meta: '' });
        expect(meta).toEqual(false);
        done();
      });
    });
    describe('when the message contains meta', () => {
      it('should return true', (done) => {
        const meta = LoggingUtil.isMetaMessage({ meta: 'message' });
        expect(meta).toEqual(true);
        done();
      });
    });
  });
  describe('#getMessageSize', () => {
    describe('when the message is empty', () => {
      it('should return 0', (done) => {
        const size = LoggingUtil.getMessageSize();
        expect(size).toEqual(0);
        done();
      });
    });
    describe('when the message is populated', () => {
      it('should return the length in bytes', (done) => {
        const size = LoggingUtil.getMessageSize('Message'); // "Message" including quotes
        expect(size).toEqual(9);
        done();
      });
    });
  });
  describe('#isMessageTooLarge', () => {
    describe('when the message is empty', () => {
      it('should return false', (done) => {
        const large = LoggingUtil.isMessageTooLarge();
        expect(large).toEqual(false);
        done();
      });
    });
    describe('when the message is not very large', () => {
      it('should return the length in bytes', (done) => {
        const large = LoggingUtil.isMessageTooLarge('Message');
        expect(large).toEqual(false);
        done();
      });
    });
    describe('when the message is very large', () => {
      it('should return the length in bytes', (done) => {
        const chars =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        // eslint-disable-next-line prefer-spread
        const random40k = Array.apply(null, Array(40000))
          .map(() => {
            return chars.charAt(Math.floor(Math.random() * chars.length));
          })
          .join(''); // 40k + double quotes = 40002 bytes
        const large = LoggingUtil.isMessageTooLarge(random40k);
        expect(large).toEqual(true);
        done();
      });
    });
  });
  describe('#isMessageSizeTooLarge', () => {
    describe('when size is empty', () => {
      it('should return false', (done) => {
        const large = LoggingUtil.isMessageSizeTooLarge();
        expect(large).toEqual(false);
        done();
      });
    });
    describe('when size is less than the max', () => {
      it('should return false', (done) => {
        const large = LoggingUtil.isMessageSizeTooLarge(20);
        expect(large).toEqual(false);
        done();
      });
    });
    describe('when size is greater than the max', () => {
      it('should return true', (done) => {
        const large = LoggingUtil.isMessageSizeTooLarge(40001);
        expect(large).toEqual(true);
        done();
      });
    });
  });
  describe('#safe', () => {
    describe('when the message is missing', () => {
      it('should return an empty string', (done) => {
        const safe = LoggingUtil.safe();
        expect(safe).toEqual('');

        done();
      });
    });
    describe('when the message is empty', () => {
      it('should return an empty string', (done) => {
        const safe = LoggingUtil.safe('');
        expect(safe).toEqual('');

        done();
      });
    });
    describe('when the message is below the max bytes', () => {
      it('should return the original message', (done) => {
        const safe = LoggingUtil.safe('Message');
        expect(safe).toEqual('Message');

        done();
      });
    });
    describe('when the message is above the max bytes', () => {
      it('should return the original message', (done) => {
        const chars =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        // eslint-disable-next-line prefer-spread
        const random40k = Array.apply(null, Array(40000))
          .map(() => {
            return chars.charAt(Math.floor(Math.random() * chars.length));
          })
          .join(''); // 40k + double quotes = 40002 bytes
        const safe = LoggingUtil.safe(random40k);
        expect(safe).toEqual('Supressed logging large object (39 KB)');

        done();
      });
    });
  });
  describe('#niceBytes', () => {
    describe('when bytes are less than 1k', () => {
      it('should return size in bytes', (done) => {
        const nice = LoggingUtil.niceBytes(309);
        expect(nice).toEqual('309 bytes');
        done();
      });
    });
    describe('when bytes are less than 1m', () => {
      it('should return size in bytes', (done) => {
        const nice = LoggingUtil.niceBytes(2567);
        expect(nice).toEqual('2.5 KB');
        done();
      });
    });
    describe('when bytes are less than 1g', () => {
      it('should return size in bytes', (done) => {
        const nice = LoggingUtil.niceBytes(12525356);
        expect(nice).toEqual('12 MB');
        done();
      });
    });
    describe('when bytes are less than 1t', () => {
      it('should return size in bytes', (done) => {
        const nice = LoggingUtil.niceBytes(5752533556);
        expect(nice).toEqual('5.4 GB');
        done();
      });
    });
  });
});
