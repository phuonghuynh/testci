#include <nan.h>
#include <atlbase.h>
#include <atlcom.h>
#include <atlsync.h>
#include <atlstr.h>
#include <sstream>
#include <wincred.h>
#include <stdio.h>
#include <WinInet.h>

#define SECURITY_WIN32
#include "Security.h"

using namespace std;

NAN_METHOD(getCurrentUserName)
{
	// Taken from Qin's ACUtil::getLocalUserName()
	std::ostringstream  msg;
	msg << "{";

	ULONG size = 512;
	wchar_t userName[512];
	int success = GetUserNameEx(NameCanonical, userName, &size);

	if( success == 0 )
		success = GetUserNameEx(NameSamCompatible, userName, &size);

	msg << "\"success\":\"" << success << "\"";

	if( success != 0 )
	{
		std::wstring wUser = userName;

		// Double up on '\' or else the JSON result will not be valid
		std::wstring from = _T("\\");
		std::wstring to = _T("\\\\");
		size_t start_pos = 0;
		while((start_pos = wUser.find(from, start_pos)) != std::string::npos)
		{
			wUser.replace(start_pos, from.length(), to);
			start_pos += to.length();
		}

		std::string user( wUser.begin(), wUser.end() );
		msg << ",\"User\":\"" << user.c_str() << "\"";
		SecureZeroMemory(userName, sizeof(userName));
	}

	msg << "}";

	auto ret = Nan::New(msg.str()).ToLocalChecked();
	info.GetReturnValue().Set(ret);
}

NAN_MODULE_INIT(Initialize) {
	NAN_EXPORT(target, getCurrentUserName);
}

NODE_MODULE(proxy, Initialize);
