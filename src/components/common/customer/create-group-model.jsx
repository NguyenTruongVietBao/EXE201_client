import React, { useState, useEffect, useRef } from 'react';
import { Plus, X, ChevronDown, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateGroupModel = ({
  isOpen,
  onClose,
  onCreateGroup,
  allInterests = [],
  isLoading = false,
  title = 'Tạo nhóm mới',
}) => {
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    maxMembers: 100,
    interests: [],
  });
  const [showInterestsDropdown, setShowInterestsDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Reset form khi modal đóng
  useEffect(() => {
    if (!isOpen) {
      setNewGroup({
        name: '',
        description: '',
        maxMembers: 100,
        interests: [],
      });
      setShowInterestsDropdown(false);
    }
  }, [isOpen]);

  // Handle click outside để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowInterestsDropdown(false);
      }
    };

    if (showInterestsDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showInterestsDropdown]);

  const handleCreateGroup = async () => {
    // Validation
    if (!newGroup.name.trim()) {
      toast.error('Vui lòng nhập tên nhóm');
      return;
    }
    if (!newGroup.description.trim()) {
      toast.error('Vui lòng nhập mô tả nhóm');
      return;
    }
    if (newGroup.interests.length === 0) {
      toast.error('Vui lòng chọn ít nhất 1 sở thích');
      return;
    }

    // Gọi callback function để xử lý tạo group
    if (onCreateGroup) {
      try {
        await onCreateGroup({
          name: newGroup.name,
          description: newGroup.description,
          maxMembers: newGroup.maxMembers,
          interests: newGroup.interests.map((interest) => interest._id),
        });

        // Reset form sau khi tạo thành công
        setNewGroup({
          name: '',
          description: '',
          maxMembers: 100,
          interests: [],
        });
        toast.success('Tạo nhóm thành công!');
      } catch (error) {
        console.error('Error creating group:', error);
        toast.error('Có lỗi xảy ra khi tạo nhóm');
      }
    }
  };

  const toggleInterestSelection = (interest) => {
    const isSelected = newGroup.interests.find((i) => i._id === interest._id);

    if (isSelected) {
      // Remove interest
      setNewGroup({
        ...newGroup,
        interests: newGroup.interests.filter((i) => i._id !== interest._id),
      });
    } else {
      // Add interest
      setNewGroup({
        ...newGroup,
        interests: [...newGroup.interests, interest],
      });
    }
    // Không đóng dropdown để có thể chọn nhiều
  };

  const selectAllInterests = () => {
    setNewGroup({
      ...newGroup,
      interests: [...allInterests],
    });
  };

  const deselectAllInterests = () => {
    setNewGroup({
      ...newGroup,
      interests: [],
    });
  };

  const removeInterestFromNewGroup = (interestId) => {
    setNewGroup({
      ...newGroup,
      interests: newGroup.interests.filter((i) => i._id !== interestId),
    });
  };

  const handleClose = () => {
    setNewGroup({
      name: '',
      description: '',
      maxMembers: 100,
      interests: [],
    });
    setShowInterestsDropdown(false);
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
        <div className='p-6 border-b border-gray-200'>
          <div className='flex items-center justify-between'>
            <h3 className='text-2xl font-bold text-gray-900'>{title}</h3>
            <button
              onClick={handleClose}
              className='p-2 hover:bg-gray-100 rounded-xl transition-colors'
            >
              <X className='w-6 h-6 text-gray-500' />
            </button>
          </div>
        </div>

        <div className='p-6 space-y-6'>
          {/* Group Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Tên nhóm *
            </label>
            <input
              type='text'
              value={newGroup.name}
              onChange={(e) =>
                setNewGroup({ ...newGroup, name: e.target.value })
              }
              placeholder='Ví dụ: ReactJS Việt Nam'
              className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
            />
          </div>

          {/* Description */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Mô tả nhóm *
            </label>
            <textarea
              value={newGroup.description}
              onChange={(e) =>
                setNewGroup({ ...newGroup, description: e.target.value })
              }
              placeholder='Mô tả về mục đích và hoạt động của nhóm...'
              rows={4}
              className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none'
            />
          </div>

          {/* Max Members */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Số thành viên tối đa
            </label>
            <input
              type='number'
              value={newGroup.maxMembers}
              onChange={(e) =>
                setNewGroup({
                  ...newGroup,
                  maxMembers: parseInt(e.target.value) || 100,
                })
              }
              min='2'
              max='1000'
              className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
            />
          </div>

          {/* Interests */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Sở thích nhóm * (chọn ít nhất 1)
            </label>

            {/* Selected Interests */}
            {newGroup.interests.length > 0 && (
              <div className='flex flex-wrap gap-2 mb-3'>
                {newGroup.interests.map((interest) => (
                  <span
                    key={interest._id}
                    className='px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2'
                  >
                    <span>{interest.emoji}</span>
                    <span>{interest.name}</span>
                    <button
                      onClick={() => removeInterestFromNewGroup(interest._id)}
                      className='hover:bg-purple-200 rounded-full p-0.5'
                    >
                      <X className='w-3 h-3' />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Interest Dropdown */}
            <div className='relative' ref={dropdownRef}>
              <button
                onClick={() => setShowInterestsDropdown(!showInterestsDropdown)}
                className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-left flex items-center justify-between'
              >
                <span
                  className={
                    newGroup.interests.length > 0
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-500'
                  }
                >
                  {newGroup.interests.length > 0
                    ? `Đã chọn ${newGroup.interests.length} sở thích`
                    : 'Chọn sở thích...'}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    showInterestsDropdown ? 'rotate-180' : ''
                  } ${
                    newGroup.interests.length > 0
                      ? 'text-purple-500'
                      : 'text-gray-400'
                  }`}
                />
              </button>

              {showInterestsDropdown && (
                <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-80 overflow-y-auto'>
                  {/* Header với Select All / Deselect All */}
                  <div className='sticky top-0 bg-white border-b border-gray-100 p-3'>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='font-medium text-gray-700'>
                        Đã chọn: {newGroup.interests.length}/
                        {allInterests.length}
                      </span>
                      <div className='flex items-center gap-2'>
                        <button
                          onClick={selectAllInterests}
                          className='px-2 py-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
                        >
                          Chọn tất cả
                        </button>
                        <span className='text-gray-300'>|</span>
                        <button
                          onClick={deselectAllInterests}
                          className='px-2 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors'
                        >
                          Bỏ chọn
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Danh sách interests */}
                  <div className='p-2'>
                    {allInterests.map((interest) => {
                      const isSelected = newGroup.interests.find(
                        (i) => i._id === interest._id
                      );

                      return (
                        <button
                          key={interest._id}
                          onClick={() => toggleInterestSelection(interest)}
                          className='w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 rounded-lg'
                        >
                          {/* Checkbox */}
                          <div
                            className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${
                              isSelected
                                ? 'bg-purple-500 border-purple-500'
                                : 'border-gray-300 hover:border-purple-400'
                            }`}
                          >
                            {isSelected && (
                              <CheckCircle className='w-3 h-3 text-white' />
                            )}
                          </div>

                          {/* Interest info */}
                          <span className='text-xl'>{interest.emoji}</span>
                          <span
                            className={`flex-1 ${
                              isSelected
                                ? 'font-medium text-purple-700'
                                : 'text-gray-700'
                            }`}
                          >
                            {interest.name}
                          </span>

                          {/* Selected indicator */}
                          {isSelected && (
                            <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className='sticky bottom-0 bg-white border-t border-gray-100 p-3'>
                    <button
                      onClick={() => setShowInterestsDropdown(false)}
                      className='w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium'
                    >
                      Xong ({newGroup.interests.length} đã chọn)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='p-6 border-t border-gray-200'>
          <div className='flex items-center gap-3'>
            <button
              onClick={handleClose}
              className='flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium'
            >
              Hủy
            </button>
            <button
              onClick={handleCreateGroup}
              disabled={
                isLoading ||
                !newGroup.name.trim() ||
                !newGroup.description.trim() ||
                newGroup.interests.length === 0
              }
              className='flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {isLoading ? (
                <>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                  Đang tạo...
                </>
              ) : (
                <>
                  <Plus className='w-5 h-5' />
                  Tạo nhóm
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModel;
